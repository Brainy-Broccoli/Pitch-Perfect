export default function(state = null, action) {
  switch(action.type) {
  case 'PAGE_SELECTED':
    return action.payload;
  }
  
  return state;
}