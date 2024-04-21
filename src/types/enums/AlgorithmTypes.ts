export enum AlgorithmTypes {
  GENETIC = 'GENETIC',
  PARTICLES_SWARM = 'PARTICLES_SWARM',
  SIMULATED_ANNEALING = 'SIMULATED_ANNEALING'
}

export function getTranslatedType(type: AlgorithmTypes): string {
  switch (type) {
    case AlgorithmTypes.GENETIC:
      return "Генетический алгоритм"
    case AlgorithmTypes.PARTICLES_SWARM:
      return "Метод роя частиц"
    case AlgorithmTypes.SIMULATED_ANNEALING:
      return "Метод отжига"
  }
}