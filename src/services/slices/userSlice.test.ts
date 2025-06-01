import {
  initialState,
  userReducer,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';
import { TUser } from '@utils-types';
const user: TUser = {
  name: 'Ronnie OSullivan',
  email: 'ronnie147@wst.org'
};
describe('Проверка слайса userSlice', () => {
  test('Проверка получения ошибки запрса регистрации пользователя', () => {
    const newState = userReducer(initialState, {
      type: registerUser.rejected.type
    });
    expect(newState.user).toBeNull();
  });

  test('Проверка успешно выполненного запроса о регистрации пользователя', () => {
    const newState = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: user
    });
    expect(newState.user).toEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });

  test('Проверка получения ошибки запроса на вход пользователя', () => {
    const newState = userReducer(initialState, {
      type: loginUser.rejected.type
    });
    expect(newState.user).toBeNull();
  });

  test('Проверка успешного выполнения входа пользователя', () => {
    const newState = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: user
    });
    expect(newState.user).toStrictEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });

  test('Проверка успешного выхода пользователя', () => {
    const newState = userReducer(initialState, {
      type: logoutUser.fulfilled.type
    });
    expect(newState.user).toBeNull();
  });

  test('Проверка полученяи ошибки при запросе на выход пользователя', () => {
    const newState = userReducer(initialState, {
      type: updateUser.rejected.type
    });
    expect(newState.isAuthChecked).toEqual(false);
  });

  test('Проверка успешного обновления данных пользователя', () => {
    const newState = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: user
    });
    expect(newState.user).toStrictEqual(user);
    expect(newState.isAuthChecked).toEqual(true);
  });
});
