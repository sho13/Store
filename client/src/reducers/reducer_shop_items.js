var DEFAULT_STATE = {
  shopItems: [],
  cartItems: {}
}

const setItem = (state, action) => {
  const newState = {};
  Object.assign(newState, state, { shopItems: action.payLoad });
  return newState;
}

const setQuantity = (state, action) => {
  let newArr = [...state.shopItems.slice(0, action.index),
   action.obj,
   ...state.shopItems.slice(action.index + 1)];
  const newState = {};
  Object.assign(newState, state, { shopItems: newArr });
  return newState;
}

const addItem = (state, action) => {
  var newObj = Object.assign({}, state.cartItems);
  newObj[action.name] = action.obj;
  let newState = {};
  Object.assign(newState, state, {cartItems: newObj});
  return newState;
}

const removeItem = (state, action) => {
  var newObj = Object.assign({}, state.cartItems);
  let newState = {};
  Object.assign(newState, state, {cartItems: newObj});
  return newState;
}

const checkout = (state, action) => {
  var newObj = Object.assign({}, action.obj);
  let newState = {};
  Object.assign(newState, state, {cartItems: newObj});
  return newState;
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case 'SHOP_ITEMS':
      return setItem(state, action);
    case 'UPDATE_QUANTITY':
      return setQuantity(state, action);
    case 'ADD_CART_ITEMS':
      return addItem(state, action);
    case 'REMOVE_CART_ITEMS':
      return removeItem(state, action);
    case 'CHECKOUT':
      return checkout(state, action);
    default:
      return state;
  }
}
