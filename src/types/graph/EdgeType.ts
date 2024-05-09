export enum EdgeType {
  DIRECTED = 'DIRECTED', 
  NOT_ORIENTED = 'NOT_ORIENTED'
}

export function getTranslatedEdgeType(type: EdgeType): string {
  switch (type) {
    case EdgeType.DIRECTED: {
      return "Ориентированное"
    }
    case EdgeType.NOT_ORIENTED: {
      return "Не ориентированное"
    }
  }
}