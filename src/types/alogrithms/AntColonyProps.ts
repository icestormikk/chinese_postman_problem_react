import { AlgorithmProps } from "./AlgorithmProps";

export type AntColonyProps = AlgorithmProps & {
  antColony: {
    startNodeId: string,
    iterationCount: number,
    antCount: number,
    startPheromoneValue: number,
    proximityCoefficient: number,
    alpha: number,
    beta: number,
    remainingPheromoneRate: number,
    q: number,
  }
}

export type AntColonyFormProps = {
  startNodeId: { value: string },
  iterationCount: { value: number },
  antCount: { value: number },
  startPheromoneValue: { value: number },
  proximityCoefficient: { value: number },
  alpha: { value: number },
  beta: { value: number },
  remainingPheromoneRate: { value: number },
  q: { value: number },
}