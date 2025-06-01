import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';

type TConstructorState = {
  constructorItems: TConstructorItems;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        const ingredientType = action.payload.type;
        switch (ingredientType) {
          case 'bun':
            state.constructorItems.bun = action.payload;
            break;
          case 'main':
            state.constructorItems.ingredients.push(action.payload);
            break;
          case 'sauce':
            state.constructorItems.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient) => {
        const id = nanoid();
        return { payload: { id: id, ...ingredient } };
      }
    },
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    moveIngredient: (state, action) => {
      const index = action.payload.index;
      const move = action.payload.move;

      if (move === 'up') {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index - 1]
        ] = [
          state.constructorItems.ingredients[index - 1],
          state.constructorItems.ingredients[index]
        ];
      } else if (move === 'down') {
        [
          state.constructorItems.ingredients[index],
          state.constructorItems.ingredients[index + 1]
        ] = [
          state.constructorItems.ingredients[index + 1],
          state.constructorItems.ingredients[index]
        ];
      }
    },
    resetConstructor: (state) => (state = initialState)
  },
  selectors: {
    getBurgerConstructor: (state) => state
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  resetConstructor
} = constructorSlice.actions;

export const { getBurgerConstructor } = constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;
