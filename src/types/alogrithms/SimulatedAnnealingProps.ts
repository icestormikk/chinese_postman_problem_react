import { AlgorithmProps } from "./AlgorithmProps"

export type SimulatedAnnealingProps = AlgorithmProps & {
  annealing: {
    minTemperature: number,
    maxTemperature: number,
    temperatureDecreasingCoefficient: number,
    selectedNodeId: string
  }
}

export type SimulatedAnnealingFormProps = {
  minTemperature: { value: number },
  maxTemperature: { value: number },
  temperatureDecreasingCoefficient: { value: number },
  selectedNodeId: { value: string }
}