import { configureStore } from '@reduxjs/toolkit'
import mainSlice from './slices/mainSlice'
import graphSlice from './slices/graphSlice'

export const store = configureStore({
  reducer: {
    main: mainSlice,
    graph: graphSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch