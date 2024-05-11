import { AlgorithmProps } from "./AlgorithmProps"

export type GeneticAlgorithmProps = AlgorithmProps & {
  genetic: {
    iterationsCount: number
    populationSize: number
    startNodeId: string
    parents: {
      selection: string
      chooser: string
    }
    recombinationType: string
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
  iterationsCount: { value: number },
  populationSize: { value: number },
  startNodeId: { value: string },
  parentsSelectionMethod: { value: string },
  parentsChooserMethod: { value: string },
  recombinationType: { value: string },
  mutationType: { value: string },
  mutationRate: { value: number },
  newPopulationSelectionMethod: { value: string },
  newPopulationRate: { value: number }
}