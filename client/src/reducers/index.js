import { combineReducers } from 'redux';

import ShopItems from './reducer_shop_items';

const rootReducer = combineReducers({
  shopItems: ShopItems
});


export default rootReducer;
