import { configureStore } from '@reduxjs/toolkit'
import customerReducer from './slice/CustomerSlice'
export const store = configureStore({
  reducer: {
    customers: customerReducer,
  },
})