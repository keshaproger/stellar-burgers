import {
  constructorReducer,
  initialState,
  addIngredient,
  removeIngredient,
  moveIngredient
} from './constructorSlice';

describe('Тесты слайса constructorSlice', () => {
  const newBun = {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093c',
    id: '1'
  };
  const newMain = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e',
    id: '2'
  };
  const newMain2 = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e',
    id: '3'
  };

  it('Проверка добавления ингредиента', () => {
    let newState = constructorReducer(initialState, addIngredient(newBun));
    const { bun } = newState.constructorItems;
    expect(bun).toEqual({ ...newBun });
  });

  it('Проверка удаления ингредиента', () => {
    let newState = constructorReducer(initialState, addIngredient(newMain));
    newState = constructorReducer(newState, removeIngredient(newMain.id));
    expect(newState).toEqual(initialState);
  });

  it('Проверка изменения порядка ингредиентов', () => {
    let newState = constructorReducer(initialState, addIngredient(newMain));
    newState = constructorReducer(newState, addIngredient(newMain2));
    newState = constructorReducer(
      newState,
      moveIngredient({ index: 1, move: 'up' })
    );
    let { ingredients } = newState.constructorItems;
    expect(ingredients).toEqual([newMain2, newMain]);
  });
});
