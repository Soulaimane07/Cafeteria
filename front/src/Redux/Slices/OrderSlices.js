import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverUrl } from "../../Components/Variables";

export const getOrders = createAsyncThunk('favorits', async (userId)=> {
    try {
      const response = await axios.get(`${serverUrl}/orders/${userId}/`)
      return response.data
    } catch (error) {
      console.error(error);
      return error.message
    }
})

export const OrdersSlice = createSlice({
    name:"Orders",
    initialState: {
        orders: [],
        selectedOrder: [],
        isLoading: false,
        isError: false,
    },
    reducers: {
        emptyOrders: (state, action) => {
            state.orders = []
        },
        addToOrder: (state, action) => {
            state.selectedOrder.push(action.payload)
        },
        removeFromOrder: (state, action) => {
            state.selectedOrder = state.selectedOrder.filter(function(item) {
                return item._id !== action.payload._id
            })
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getOrders.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getOrders.fulfilled, (state, action)=> {
                state.orders = action.payload.data
            })
            .addCase(getOrders.rejected, (state, action)=> {
                state.isError = action.error.message
            })
    }
})

export const ordersActions = OrdersSlice.actions
export default OrdersSlice.reducer