import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../services/store';
import {
  removeIngredient,
  moveIngredient
} from '../../services/slices/constructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveIngredientDown = () => {
      dispatch(moveIngredient({ direction: 'down', id: ingredient.id }));
    };

    const handleMoveIngredientUp = () => {
      dispatch(moveIngredient({ direction: 'up', id: ingredient.id }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveIngredientUp}
        handleMoveDown={handleMoveIngredientDown}
        handleClose={handleClose}
      />
    );
  }
);
