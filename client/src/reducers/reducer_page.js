const activePage = (state = 'home', action) => {
  switch (action.type) {
  case 'PAGE_SELECTED':
    return action.pageName;
  default:
    return state;
  }
};

export default activePage;