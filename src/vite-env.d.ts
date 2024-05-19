/// <reference types="vite/client" />

import { AntColonyProps } from "./types/alogrithms/AntColonyProps";
import { GeneticAlgorithmProps } from "./types/alogrithms/GeneticAlgorithmProps";
import { ParticleSwarmProps } from "./types/alogrithms/ParticleSwarmProps";
import { SimulatedAnnealingProps } from "./types/alogrithms/SimulatedAnnealingProps";
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

  launchParticleSwarm: (
    logFilePath: string, 
    execFilePath: string,
    resultsFilePath: string,
    configuration: ParticleSwarmProps, 
    graph: Graph<number>
  ) => Promise<void>
  
  launchAntColony: (
    logFilePath: string, 
    execFilePath: string,
    resultsFilePath: string,
    configuration: AntColonyProps, 
    graph: Graph<number>
  ) => Promise<void>

  launchSimulatedAnnealing: (
    logFilePath: string, 
    execFilePath: string,
    resultsFilePath: string,
    configuration: SimulatedAnnealingProps, 
    graph: Graph<number>
  ) => Promise<void>
}

declare global {
  interface Window {
    electron: IElectronAPI
  }
}
