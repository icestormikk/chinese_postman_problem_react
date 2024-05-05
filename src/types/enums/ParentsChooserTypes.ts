export enum ParentsChooserTypes {
  PANMIXIA = 'PANMIXIA',
  INBREEDING = 'INBREEDING',
  OUTBREEDING = 'OUTBREEDING'
}

export function getTranslatedParentsChooserType(type: ParentsChooserTypes) {
  switch (type) {
    case ParentsChooserTypes.PANMIXIA: {
      return 'Панмиксия'
    }
    case ParentsChooserTypes.INBREEDING: {
      return 'Инбридинг'
    }
    case ParentsChooserTypes.OUTBREEDING: {
      return 'Аутбридинг'
    }
  }
}