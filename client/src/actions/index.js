import axios from 'axios'

export const SHOP_ITEMS = 'SHOP_ITEMS'

export function shopItems(payload) {
  return {
    type: SHOP_ITEMS,
    payload
  }
}
