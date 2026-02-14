import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './Reducers/UserReducer'

export const store = configureStore({
  reducer: {
    userData: userReducer,
  },
})

export default store;