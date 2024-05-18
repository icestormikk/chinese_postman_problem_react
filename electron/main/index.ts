import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'
import { update } from './update'
import { readFileSync, existsSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { GeneticAlgorithmProps } from '@/types/alogrithms/GeneticAlgorithmProps'
import { Graph } from '@/types/graph/Graph'
import { AntColonyProps } from '@/types/alogrithms/AntColonyProps'

globalThis.__filename = fileURLToPath(import.meta.url)
globalThis.__dirname = path.dirname(__filename)

process.env.APP_ROOT = path.join(__dirname, '../..')

export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null
const preload = path.join(__dirname, '../preload/index.mjs')
const indexHtml = path.join(RENDERER_DIST, 'index.html')

async function createWindow() {
  win = new BrowserWindow({
    title: 'Main window',
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'),
    autoHideMenuBar: true,
    webPreferences: {
      preload,
      // nodeIntegration: true,
      // contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
    win.webContents.openDevTools()
  } else {
    win.loadFile(indexHtml)
  }

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })

  update(win)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`)
  } else {
    childWindow.loadFile(indexHtml, { hash: arg })
  }
})


ipcMain.handle('getHomeDirectory', (_: any) => {
  return app.getPath('home')
})
ipcMain.handle('readFile', async (_: any, filepath: string): Promise<string> => {
  if (!filepath) {
    throw new Error('The path to the file to be read should not be empty or null')
  }

  try {
    const data = readFileSync(filepath, {encoding: 'utf-8'})
    return data
  } catch (e: any) {
    console.error(`An error occurred while reading the file: ${e.message}`)
    throw e
  }
})
ipcMain.handle('isFileExists', async (_: any, filepath: string) => {
  if (!filepath) {
    throw new Error('The path to the file to be read should not be empty or null')
  }

  return existsSync(filepath)
})
ipcMain.handle('writeToFile', async (_: any, filepath: string, content: string) => {
  if (!filepath) {
    throw new Error('The path to the file for writing should not be empty')
  }

  try {
    writeFileSync(filepath, content)
  } catch (e: any) {
    console.error(`Error while writing to a file (${e.message})`)
    throw e
  }
})
ipcMain.handle('launchGeneticAlgorithm', async (
  _: any, 
  logFilePath: string,
  jarFilePath: string, 
  resultsFilePath: string,
  configuration: GeneticAlgorithmProps,
  graph: Graph<number>
) => {
  const graphOutputFilepath = getGraphOutputFilepath()
  writeFileSync(graphOutputFilepath, JSON.stringify(graph, null, 2), { flag: 'w+' })

  const configurationFilepath = getConfigurationOutputFilepath()
  writeFileSync(configurationFilepath, JSON.stringify(configuration, null, 2), { flag: 'w+' })

  execSync(
    `java -Dlogfile-path=${logFilePath} -jar ${jarFilePath} --graph ${graphOutputFilepath} --config ${configurationFilepath} --output ${resultsFilePath}`, 
  )
})
ipcMain.handle('launchAntColony', (
  _: any,
  logFilePath: string,
  jarFilePath: string, 
  resultsFilePath: string,
  configuration: AntColonyProps,
  graph: Graph<number>
) => {
  const graphOutputFilepath = getGraphOutputFilepath()
  writeFileSync(graphOutputFilepath, JSON.stringify(graph, null, 2), { flag: 'w+' })

  const configurationFilepath = getConfigurationOutputFilepath()
  writeFileSync(configurationFilepath, JSON.stringify(configuration, null, 2), { flag: 'w+' })

  execSync(
    `java -Dlogfile-path=${logFilePath} -jar ${jarFilePath} --graph ${graphOutputFilepath} --config ${configurationFilepath} --output ${resultsFilePath}`
  )
})

function getGraphOutputFilepath(): string {
  const filename = `data.json`
  return path.join(os.homedir(), filename)
}

function getConfigurationOutputFilepath(): string {
  const filename = `config.json`
  return path.join(os.homedir(), filename)
}