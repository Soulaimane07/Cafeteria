import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Slices/UserSlice'
import favoritReducer from './Slices/FavoriteSlice'
import pageOrderReducer from './Slices/PageOrder'

export const store = configureStore({
  reducer: {
    User: userReducer,
    Favorits: favoritReducer,
    PageOrder: pageOrderReducer,
  },
})

