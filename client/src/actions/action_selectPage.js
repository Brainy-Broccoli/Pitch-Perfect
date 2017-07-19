export function selectPage(page) {
  console.log('clicked');
  return {
    type: 'PAGE_SELECTED',
    payload: page
  };
}