// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object
import { LOAD_PROFILE } from '../actions/actionTypes';

const initialState = {
  name: '',
  photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
  badgeUrls: [],
  isMentor: false,
};

const profileInfo = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_PROFILE:
    return action.profileState;
  default:
    return state;
  }
};

export default profileInfo;


