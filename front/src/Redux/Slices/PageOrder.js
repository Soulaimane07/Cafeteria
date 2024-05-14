import { createSlice } from '@reduxjs/toolkit'

export const PageOrderSlice = createSlice({
  name: 'PageOrder',
  initialState: {
    plat: null,
    opened: false,
  },
  reducers: {
    open: (state, action) => {
      state.opened = true
      state.plat = action.payload
    },
    close: (state, action) => {
      state.opened = false
    },
  },
})

export const PageOrderActions = PageOrderSlice.actions
export default PageOrderSlice.reducer