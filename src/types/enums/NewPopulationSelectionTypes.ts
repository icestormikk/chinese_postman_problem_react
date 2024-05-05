export enum NewPopulationSelectionTypes {
  TRUNCATION = 'TRUNCATION',
  ELITE = 'ELITE',
  EXCLUSION = 'EXCLUSION'
}

export function getNewPopulationSelectionType(type: NewPopulationSelectionTypes) {
  switch (type) {
    case NewPopulationSelectionTypes.TRUNCATION: {
      return 'Отбор усечением'
    }
    case NewPopulationSelectionTypes.ELITE: {
      return 'Элитарный отбор'
    }
    case NewPopulationSelectionTypes.EXCLUSION: {
      return 'Отбор усечением'
    }
  }
}