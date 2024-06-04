import { AlgorithmProps } from "./AlgorithmProps"

export type GeneticAlgorithmProps = AlgorithmProps & {
  genetic: {
    iterationsCount: number
    populationSize: number
    parents: {
      selection: string
      chooser: string
    }
    recombination: {
      type: string,
      rate: number
    }
    mutation: {
      type: string
      rate: number
    }
    newPopulation: {
      type: string
      rate: number
    }
  }
}

export type GeneticAlgorithmFormProps = {
  maxLength: { value: number },
  iterationsCount: { value: number },
  populationSize: { value: number },
  startNodeId: { value: string },
  parentsSelectionMethod: { value: string },
  parentsChooserMethod: { value: string },
  recombinationType: { value: string },
  recombinationRate: { value: number },
  mutationType: { value: string },
  mutationRate: { value: number },
  newPopulationSelectionMethod: { value: string },
  newPopulationRate: { value: number }
}