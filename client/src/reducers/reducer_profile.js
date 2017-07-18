// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object

const initialState = {
  name: 'Michael',
  photo: 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg',
  badges: ['https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg', 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg'],
  recent: [
    {
      deck: 'food',
      progress: 6,
      total: 13,
      accuracy: 89 + '%'
    },
    {
      deck: 'travel',
      progress: 8,
      total: 19,
      accuracy: 32 + '%'
    },
    {
      deck: 'food',
      progress: 7,
      total: 18,
      accuracy: 55 + '%'
    }
  ],
  mentor: {
    elegible: true,
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


