<<<<<<< HEAD
export default function() {
  return {
    name: 'Yermek',
    photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
    badges: 'Badges',
    recent: 'Recent stuff',
    mentor: 'Mentor info'
  };
}
=======
const profileInfo = (state = {}, action) => { 
  switch (action.type) {
  default:
    return {
      name: 'Michael',
      photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
      badges: 'Badges',
      recent: 'Recent stuff',
      mentor: 'Mentor info'
    };
  }
};

export default profileInfo;
>>>>>>> Refactor code for readability/different function and export style. Also, make the reducer_page return 'home' by default so there is a black underline upon login
