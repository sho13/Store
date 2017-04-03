import axios from 'axios'

export const SHOP_ITEMS = 'SHOP_ITEMS'

export function shopItems(payLoad) {
  return {
    type: SHOP_ITEMS,
    payLoad
  }
}
