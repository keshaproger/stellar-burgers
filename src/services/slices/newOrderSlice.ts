import { TNewOrderResponse, orderBurgerApi } from '../../utils/burger-api';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TNewOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

export const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null
};

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    setOrderRequest: (
      state: TNewOrderState,
      action: PayloadAction<boolean>
    ) => {
      state.orderRequest = action.payload;
    },
    resetOrderModalData: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
    },
    setOrderModalData: (state, action) => {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    getNewOrderRequest: (state): boolean => state.orderRequest,
    getNewOrderModalData: (state): TOrder | null => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      });
  }
});

export const createNewOrder = createAsyncThunk(
  'newOrder/create',
  async (orderIds: string[]) => {
    const res = await orderBurgerApi(orderIds);
    return res;
  }
);

export const { setOrderRequest, setOrderModalData, resetOrderModalData } =
  newOrderSlice.actions;
export const { getNewOrderRequest, getNewOrderModalData } =
  newOrderSlice.selectors;
export const newOrderReducer = newOrderSlice.reducer;
