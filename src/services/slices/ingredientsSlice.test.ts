import {
  ingredientsReducer,
  initialState,
  getAllIngredients
} from './ingredientsSlice';

describe('Тесты слайса ingredientsSlice', () => {
  it('Проверка состояния pending у запроса на сервер', () => {
    const state = ingredientsReducer(
      initialState,
      getAllIngredients.pending('')
    );
    expect(state.isLoading).toBe(true);
  });

  it('Проверка успешного выполнения запроса', async () => {
    const ingredients = [
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e'
      },
      {
        calories: 643,
        carbohydrates: 85,
        fat: 26,
        image: 'https://code.s3.yandex.net/react/code/meat-03.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
        name: 'Филе Люминесцентного тетраодонтимформа',
        price: 988,
        proteins: 44,
        type: 'main',
        __v: 0,
        _id: '643d69a5c3f7b9001cfa093e'
      }
    ];

    const state = ingredientsReducer(initialState, {
      type: getAllIngredients.fulfilled.type,
      payload: ingredients
    });

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('Проверка получения ошибки запроса на сервер', () => {
    const state = ingredientsReducer(initialState, {
      type: getAllIngredients.rejected.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.ingredients).toEqual([]);
  });
});
