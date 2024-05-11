import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../Components/Variables";

export const getFavorits = createAsyncThunk('favorits', async (userId)=> {
    try {
      const response = await axios.get(`${serverUrl}/favorites/${userId}/`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const FavoritsSlice = createSlice({
    name:"Favorits",
    initialState: {
        plats: [],
        isLoading: false,
        isError: false,
    },
    reducers: {
        emptyFavorites: (state, action) => {
            state.products = []
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getFavorits.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getFavorits.fulfilled, (state, action)=> {
                state.plats = action.payload.data
            })
            .addCase(getFavorits.rejected, (state, action)=> {
                state.isError = action.error.message
            })
    }
})

export const favoritsActions = FavoritsSlice.actions
export default FavoritsSlice.reducer