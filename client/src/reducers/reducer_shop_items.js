var DEFAULT_STATE = {
  shopItems: [],
  cartItems: []
}

const setItem = (state, action) => {
  console.log('state:: ', state);
  console.log('action:: ', action);
  const newState = {}
  Object.assign(newState, state, { shopItems: action.payLoad })
  return newState
}

const setQuantity = (state, action) => {
  console.log('UPDATE_QUANTITY state:: ', state);
  console.log('UPDATE_QUANTITY action:: ', action)
   let newArr = [...state.shopItems.slice(0, action.index),
     action.obj,
     ...state.shopItems.slice(action.index + 1)]
   const newState = {}
   Object.assign(newState, state, { shopItems: newArr })
   return newState
 }

const addItem = (state, action) => {
  console.log('CART_ITEMS state:: ', state);
  console.log('CART_ITEMS action:: ', action)
  var newArr = [...state.cartItems]
  newArr.push(action.obj)
  let newState = {}
  Object.assign(newState, state, {cartItems: newArr})
  return newState
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case 'SHOP_ITEMS' :
      return setItem(state, action);
    case 'UPDATE_QUANTITY' :
      return setQuantity(state, action);
    case 'CART_ITEMS' :
      return addItem(state, action);
    default:
      return state;
  }
}
