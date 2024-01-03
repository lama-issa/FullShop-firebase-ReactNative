

import { ADD_ORDER, SET_ORDERS } from '../actions/orders';
import Order from '../../models/order';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        orders: action.orders
      };
    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return {
        ...state,
        orders: state.orders.concat(newOrder) //The concat method is used to concatenate arrays. In this case, it creates a new array by combining the existing orders (state.orders) with the newOrder object.then adds a new array of orders with the newly created order appended to it.
        
      };
  }

  return state;//If the action type doesn't match any case in the switch statement, it returns the current state unchanged.
};
