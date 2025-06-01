import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  getBurgerConstructor,
  resetConstructor
} from '../../services/slices/constructorSlice';
import {
  createNewOrder,
  getNewOrderModalData,
  getNewOrderRequest,
  resetOrderModalData
} from '../../services/slices/newOrderSlice';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUser);

  const constructorItems = useSelector(getBurgerConstructor).constructorItems;
  const newOrderRequest = useSelector(getNewOrderRequest);
  const newOrderModalData = useSelector(getNewOrderModalData);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  const closeNewOrderModal = () => {
    dispatch(resetOrderModalData());
    dispatch(resetConstructor());
    navigate('/');
  };

  const handleOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || newOrderRequest) return;

    const newOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((el) => el._id),
      constructorItems.bun._id
    ];
    dispatch(createNewOrder(newOrder));
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={newOrderRequest}
      constructorItems={constructorItems}
      orderModalData={newOrderModalData}
      onOrderClick={handleOrderClick}
      closeOrderModal={closeNewOrderModal}
    />
  );
};
