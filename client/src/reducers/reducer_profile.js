const profileInfo = (state = {}, action) => { 
  switch (action.type) {
  default:
    return {
      name: 'Yermek',
      photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
      badges: 'Badges',
      recent: 'Recent stuff',
      mentor: 'Mentor info'
    };
  }
};

export default profileInfo;
