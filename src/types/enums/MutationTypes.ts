export enum MutationTypes {
  REPLACING = 'REPLACING',
  SWAPPING = 'SWAPPING'
}

export function getTranslatedMutationType(type: MutationTypes) {
  switch (type) {
    case MutationTypes.REPLACING: {
      return 'Мутация замещением'
    }
    case MutationTypes.SWAPPING: {
      return 'Перестановочная мутация'
    }
  }
}