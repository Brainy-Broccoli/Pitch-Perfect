// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object

const initialState = {
  name: 'Michael Chiang',
  photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
  badges: ['https://proprofs-cdn.s3.amazonaws.com/images/games/user_images/misc/5211927825.png', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'http://www.freeiconspng.com/uploads/travel-3-icon--colorflow-iconset--tribalmarkings-24.png', 'http://icons.iconarchive.com/icons/bokehlicia/pacifica/256/weather-icon.png'],
  mentor: {
    eligible: true,
    icon: 'https://static3.bigstockphoto.com/4/8/9/small2/98422448.jpg'
  }
};

const profileInfo = (state = initialState, action) => { 
  switch (action.type) {
  default:
    return state;
  }
};

export default profileInfo;


