import { UploadStepState } from "./enums/UploadStepState"

export type UploadStep = {
  title: string
  description: string,
  content: JSX.Element,
  state: UploadStepState
}