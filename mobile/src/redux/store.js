import { configureStore } from '@reduxjs/toolkit'
import  authSllice  from './feautures/UserSlice'

export const store = configureStore({
  reducer: {
    user:authSllice,
  },
})