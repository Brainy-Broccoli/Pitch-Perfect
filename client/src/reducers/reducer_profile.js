// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object
import { LOAD_PROFILE } from '../actions/actionTypes';

const initialState = {
  name: 'Michael Chiang',
  photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
  badgeUrls: ['https://proprofs-cdn.s3.amazonaws.com/images/games/user_images/misc/5211927825.png', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'http://www.freeiconspng.com/uploads/travel-3-icon--colorflow-iconset--tribalmarkings-24.png', 'http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/weather-icon.png'],
  isMentor: true,
};

const profileInfo = (state = initialState, action) => {
  switch (action.type) {
  case LOAD_PROFILE:
      console.log(action.profileState)
    return action.profileState;
  default:
    return state;
  }
};

export default profileInfo;


