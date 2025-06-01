import { getIngredientsApi } from '../../utils/burger-api';
import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from '../store';

type TIngredientsState = {
  isLoading: boolean;
  ingredients: TIngredient[];
};

export const initialState: TIngredientsState = {
  isLoading: false,
  ingredients: []
};

export const getIngredientsByType = (type: string) =>
  createSelector(
    (state: RootState) => state.ingredients.ingredients,
    (ingredients) =>
      ingredients ? ingredients.filter((item) => item.type === type) : []
  );

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = false;
    },
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
      state.isLoading = false;
    }
  },
  selectors: {
    getIsLoading: (state) => state.isLoading,
    getIngredients: (state) => state.ingredients
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        console.log(state.ingredients);
        state.isLoading = false;
      })
      .addCase(getAllIngredients.rejected, (state) => {
        state.isLoading = true;
        state.ingredients = [];
      });
  }
});

export const getAllIngredients = createAsyncThunk(
  'ingredients/get',
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

export const { setIsLoading, setIngredients } = ingredientsSlice.actions;

export const { getIsLoading, getIngredients } = ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
