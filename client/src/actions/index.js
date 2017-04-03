import axios from 'axios'

export const SHOP_ITEMS = 'SHOP_ITEMS'

export function shopItems() {
  const items = axios.get('/shopitems')
  return {
    type: SHOP_ITEMS,
    payload: items
  }
}
