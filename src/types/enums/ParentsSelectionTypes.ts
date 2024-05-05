export enum ParentsSelectionType {
  TOURNAMENT = 'TOURNAMENT',
  ROULETTE_WHEEL = 'ROLLETE_WHEEL'
}

export function getTranslatedParentsSelectionType(type: ParentsSelectionType) {
  switch (type) {
    case ParentsSelectionType.TOURNAMENT: {
      return 'Турнирный отбор'
    }
    case ParentsSelectionType.ROULETTE_WHEEL: {
      return 'Метод рулетки'
    }
  }
}