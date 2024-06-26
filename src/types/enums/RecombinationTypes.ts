export enum RecombinationTypes {
  DISCRETE = 'DISCRETE',
  SINGLE_POINT_CROSSOVER = 'SINGLE_POINT_CROSSOVER',
  TWO_POINT_CROSSOVER = 'TWO_POINT_CROSSOVER',
  SHUFFLE = 'SHUFFLE',
  CHROMOSOME_CROSSOVER = 'CHROMOSOME_CROSSOVER'
}

export function getTranslatedRecombinationType(type: RecombinationTypes) {
  switch (type) {
    case RecombinationTypes.DISCRETE: {
      return 'Дискретная рекомбинация'
    }
    case RecombinationTypes.SINGLE_POINT_CROSSOVER: {
      return 'Одноточечный кроссинговер'
    }
    case RecombinationTypes.TWO_POINT_CROSSOVER: {
      return 'Двухточечный кроссинговер'
    }
    case RecombinationTypes.SHUFFLE: {
      return 'Перетасовочный кроссинговер'
    }
    case RecombinationTypes.CHROMOSOME_CROSSOVER: {
      return 'Хромосомный кроссовер'
    }
  }
}