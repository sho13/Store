import axios from 'axios'

export const SHOP_ITEMS = 'SHOP_ITEMS';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CART_ITEMS = 'CART_ITEMS'

export function shopItems(payLoad) {
  return {
    type: SHOP_ITEMS,
    payLoad
  }
}

export function updateItem(index, obj) {
  return {
    type: UPDATE_QUANTITY,
    index,
    obj
  }
}

export function addToCart(obj) {
  return {
    type: CART_ITEMS,
    obj
  }
}

export function checkout() {

}
