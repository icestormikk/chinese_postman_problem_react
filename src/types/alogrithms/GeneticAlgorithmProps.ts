export type GeneticAlgorithmProps = {
  iterationsCount: number
  populationSize: number
  startNodeId: string
  parentsSelectionMethod: string
  parentsChooserMethod: string
  recombinationType: string
  mutationType: string
  mutationRate: number
  newPopulationSelectionMethod: string
  newPopulationRate: number
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