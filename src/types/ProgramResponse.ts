import { AlgorithmProps } from "./alogrithms/AlgorithmProps"
import { ResultProps } from "./alogrithms/ResultProps"

export type ProgramResponse = {
  code: "SUCCESS"|"FAILED",
  start: {
    configuration: AlgorithmProps
  }
  data: {
    message: string,
    possibleSolution?: string
    result?: ResultProps,
  }
}