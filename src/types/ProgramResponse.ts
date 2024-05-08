export type ProgramResponse = {
  code: "SUCCESS"|"FAILED",
  data: {
    message: string,
    durationInMs: number,
    possibleSolution?: string
    result?: Array<string>,
  }
}