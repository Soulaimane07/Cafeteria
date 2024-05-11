import { createSlice } from '@reduxjs/toolkit'

export const AddedSlice = createSlice({
  name: 'Added',
  initialState: {
    oppened: false,
    data: null,
    link: null,
  },
  reducers: {
    open: (state, action) => {
      state.data = action.payload.data
      state.link = action.payload.link
      state.oppened = true
    },
    close: (state) => {
        state.oppened = false
    },
  },
})

export const AddedToActions = AddedSlice.actions
export default AddedSlice.reducer