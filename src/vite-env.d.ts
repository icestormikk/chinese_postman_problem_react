/// <reference types="vite/client" />

import { GeneticAlgorithmProps } from "./types/alogrithms/GeneticAlgorithmProps";
import { Graph } from "./types/graph/Graph";

export interface IElectronAPI {
  getHomeDirectory: () => Promise<string>
  readFile: (filepath: string) => Promise<string>
  writeToFile: (filepath: string, content: string) => Promise<void>
  watchFile: (filepath: string, onUpdate: () => void) => Promise<void>
  isFileExists: (filepath: string) => Promise<boolean>
  launchGeneticAlgorithm: (
    logFilePath: string, 
    execFilePath: string,
    resultsFilePath: string,
    configuration: GeneticAlgorithmProps, 
    graph: Graph<number>
  ) => Promise<void>
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}
