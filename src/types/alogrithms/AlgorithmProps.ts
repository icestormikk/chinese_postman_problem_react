import { AlgorithmTypes } from "../enums/AlgorithmTypes"

export type AlgorithmProps = {
  type: AlgorithmTypes
  maxLength: number
  startNodeId: string
}