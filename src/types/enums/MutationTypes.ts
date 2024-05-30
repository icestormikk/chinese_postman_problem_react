export enum MutationTypes {
  REPLACING = 'REPLACING',
  SWAPPING = 'SWAPPING',
  EDGE_REPLACING = 'EDGE_REPLACING'
}

export function getTranslatedMutationType(type: MutationTypes) {
  switch (type) {
    case MutationTypes.REPLACING: {
      return 'Мутация замещением'
    }
    case MutationTypes.SWAPPING: {
      return 'Перестановочная мутация'
    }
    case MutationTypes.EDGE_REPLACING: {
      return 'Замена одного ребра'
    }
  }
}