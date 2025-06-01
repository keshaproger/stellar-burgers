import { getFeedsApi, getOrdersApi } from '../../utils/burger-api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrdersState = {
  orders: TOrder[];
  total: number;
  todayTotal: number;
  isLoading: boolean;
};

export const initialState: TOrdersState = {
  orders: [],
  total: 0,
  todayTotal: 0,
  isLoading: true
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setTotalOrders: (state, action) => {
      state.total = action.payload;
    },
    setTodayTotalOrders: (state, action) => {
      state.total = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotalOrders: (state) => state.total,
    getTodayTotalOrders: (state) => state.todayTotal,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.fulfilled, (state, action) => {
        console.log(action.payload.orders);
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.todayTotal = action.payload.totalToday;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.total = 0;
        state.todayTotal = 0;
        state.orders = [];
      })
      .addCase(getUserOrders.pending, (state: TOrdersState) => {
        state.isLoading = true;
      })
      .addCase(getUserOrders.rejected, (state: TOrdersState) => {
        state.isLoading = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const getAllOrders = createAsyncThunk('orders/get/all', async () => {
  const res = await getFeedsApi();
  return res;
});

export const getUserOrders = createAsyncThunk('orders/get/user', async () => {
  const res = await getOrdersApi();
  return res;
});

export const { setOrders, setTotalOrders, setTodayTotalOrders, setIsLoading } =
  ordersSlice.actions;

export const { getOrders, getTotalOrders, getTodayTotalOrders, getIsLoading } =
  ordersSlice.selectors;

export const ordersReducer = ordersSlice.reducer;
