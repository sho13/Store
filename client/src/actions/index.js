export const SHOP_ITEMS = 'SHOP_ITEMS';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const ADD_CART_ITEMS = 'ADD_CART_ITEMS';
export const REMOVE_CART_ITEMS = 'REMOVE_CART_ITEMS';
export const CHECKOUT = 'CHECKOUT';

export function shopItems(payLoad) {
  return {
    type: SHOP_ITEMS,
    payLoad
  };
}

export function updateItem(index, obj) {
  return {
    type: UPDATE_QUANTITY,
    index,
    obj
  };
}
const fuckyeah = 'fuckyeah'
export function addToCart(obj, name) {
  return {
    type: ADD_CART_ITEMS,
    obj,
    name
  };
}

export function removeFromCart(obj) {
  return {
    type: REMOVE_CART_ITEMS,
    obj
  };
}

export function checkout(obj) {
  return {
    type: CHECKOUT,
    obj
  };
}
