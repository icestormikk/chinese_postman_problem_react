import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MainState {
  executableFilePath?: string
}

const initialState: MainState = {
  executableFilePath: undefined
}

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setExecutableFilePath: (state, action: PayloadAction<string>) => {
      const path = action.payload
      state.executableFilePath = path
    }
  }
})

export const { setExecutableFilePath } = mainSlice.actions
export default mainSlice.reducer