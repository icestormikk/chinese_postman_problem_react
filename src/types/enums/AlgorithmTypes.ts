export enum AlgorithmTypes {
  GENETIC = 'GENETIC',
  PARTICLES_SWARM = 'PARTICLES_SWARM',
  ANNEALING = 'ANNEALING',
  ANT_COLONY = 'ANT_COLONY'
}

export function getTranslatedType(type: AlgorithmTypes): string {
  switch (type) {
    case AlgorithmTypes.GENETIC:
      return "Генетический алгоритм"
    case AlgorithmTypes.PARTICLES_SWARM:
      return "Метод роя частиц"
    case AlgorithmTypes.ANNEALING:
      return "Метод отжига"
    case AlgorithmTypes.ANT_COLONY:
      return "Алгоритм имитации муравьиной колонии"
  }
}