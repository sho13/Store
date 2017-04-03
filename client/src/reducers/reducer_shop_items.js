var DEFAULT_STATE = {
  shopItems: []
}

const setItem = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { shopItems: action.payLoad })
  return newState
}

export default function(state = DEFAULT_STATE, action) {
  switch(action.type) {
  case 'SHOP_ITEMS':
    return setItem(state, action);
  }
  return state;
}
