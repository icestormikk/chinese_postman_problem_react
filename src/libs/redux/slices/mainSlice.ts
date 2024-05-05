import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MainState {
  executableFilePath?: string
  logFilePath?: string
  resultsFilePath?: string
}

const initialState: MainState = {
  executableFilePath: "C:\\Users\\jigal\\IdeaProjects\\chinese_postman_problem\\build\\libs\\chinese_postman_problem-1.1-SNAPSHOT-standalone.jar",
  logFilePath: "C:\\Users\\jigal\\chinese-postman-problem-program.log",
  resultsFilePath: undefined
}

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setExecutableFilePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      state.executableFilePath = path
    },
    setLogFilePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      state.logFilePath = path
    },
    setResultsFilePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      state.resultsFilePath = path
    }
  }
})

export const { setExecutableFilePath, setLogFilePath, setResultsFilePath } = mainSlice.actions
export default mainSlice.reducer