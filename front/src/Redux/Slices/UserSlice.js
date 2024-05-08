import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'User',
  initialState: {
    data: null,
    isLoading: false,
    isError: false
  },
  reducers: {
    login: (state, action) => {
      state.data = action.payload
      localStorage.setItem("cafeteria_user", JSON.stringify(state.data))
    },
    logout: (state) => {
      state.data = null
      localStorage.removeItem("cafeteria_user")
    },
    loading: (state)=> {
        state.isLoading = true
    },
    sellerRequest: (state) => {
      state.requestSeller = true
    }
  },
})

export const UserActions = UserSlice.actions
export default UserSlice.reducer