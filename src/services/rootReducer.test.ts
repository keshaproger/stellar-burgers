import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './store';
import { initialState as constructorState } from './slices/constructorSlice';
import { initialState as ingredientsState } from './slices/ingredientsSlice';
import { initialState as userState } from './slices/userSlice';
import { initialState as newOrderState } from './slices/newOrderSlice';
import { initialState as ordersState } from './slices/ordersSlice';

const initialState = {
  ingredients: ingredientsState,
  burgerConstructor: constructorState,
  newOrder: newOrderState,
  orders: ordersState,
  user: userState
};

describe('Проверка корректной работы rootReducer', () => {
  test('Проверка обработки неизвестного экшена', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
