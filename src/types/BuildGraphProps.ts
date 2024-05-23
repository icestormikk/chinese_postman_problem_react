export type BuildGraphProps = {
  nodesCount: number,
  orientedChance: number,
  connectNodeChance: number,
  minWeight: number,
  maxWeight: number
}

export type BuildGraphFormProps = {
  nodesCount: { value: number }
  orientedChance: { value: number }
  connectNodeChance: { value: number }
  minWeight: { value: number }
  maxWeight: { value: number }
}