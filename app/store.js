import { configureStore } from '@reduxjs/toolkit'
import food from '../store/food'

export const store = configureStore({
  reducer: {
    food
  },
})

export default store