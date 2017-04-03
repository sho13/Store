import { combineReducers } from 'redux';

import ShopItems from './reducer_shop_items.js';

const rootReducer = combineReducers({
  shopItems: ShopItems
});

export default rootReducer;
