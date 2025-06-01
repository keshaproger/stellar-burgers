import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getAllOrders } from '../../services/slices/ordersSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  let orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(getAllOrders());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
