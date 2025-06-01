import { initialState, getUserOrders, ordersReducer } from './ordersSlice';

describe('Тесты слайса ordersSlice', () => {
  it('Проверка состояния pending запроса на сервер', () => {
    const state = ordersReducer(initialState, getUserOrders.pending(''));
    expect(state.isLoading).toBe(true);
  });

  it('Проверка успешного прохождения запроса', () => {
    const expectedOrder = [
      {
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa094a',
          '643d69a5c3f7b9001cfa0948',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa0944'
        ],
        _id: '6615272997ede0001d064e37',
        status: 'done',
        name: 'Флюоресцентный антарианский space астероидный альфа-сахаридный традиционный-галактический бургер',
        createdAt: '2024-04-09T11:31:53.313Z',
        updatedAt: '2024-04-09T11:31:53.313Z',
        number: 37860
      }
    ];

    const state = ordersReducer(initialState, {
      type: getUserOrders.fulfilled.type,
      payload: expectedOrder
    });

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(expectedOrder);
  });

  it('Проверка получения ошибки при отправке запроса', () => {
    const state = ordersReducer(initialState, {
      type: getUserOrders.rejected.type
    });

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([]);
  });
});
