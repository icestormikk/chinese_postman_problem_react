/// <reference types="vite/client" />

interface Window {
  electron: {
    readFile: (filepath: string) => Promise<string> 
    isFileExists: (filepath: string) => Promise<boolean>
  };
}
