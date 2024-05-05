export type ProgramResponse = {
  code: "SUCCESS"|"FAILED",
  data: {
    message: string,
    possibleSolution?: string
    result?: Array<string>,
  }
}