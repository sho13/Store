export default function(state = null, action) {
  console.log(action);
  switch(action.type) {
  case 'SHOP_ITEMS':
    return action.payload;
  }
  return state;
}
