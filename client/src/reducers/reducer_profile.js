// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object

const initialState = {
  name: 'Yermek',
  photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
  badges: 'Badges',
  recent: 'Recent stuff',
  mentor: 'Mentor info'
};

const profileInfo = (state = initialState, action) => { 
  switch (action.type) {
  default:
    return state;
  }
};

export default profileInfo;
