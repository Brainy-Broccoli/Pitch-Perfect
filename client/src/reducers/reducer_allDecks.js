// This ensures the intial state of the store has the dummy data
// Once we load with live data initialState should be replaced with an empty object

const initialState = {
  decks: [
    {id:1, topicName: 'Food', image: 'https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg'},
    {id:2, topicName: 'Weather', image: 'http://goldentroutwilderness.files.wordpress.com/2012/01/various-weather.jpg'},
    {id:3, topicName: 'Family', image: 'http://prosperityedwell.com/wp-content/uploads/2016/06/familypic.jpg'},
    {id:4, topicName: 'Greetings', image: 'http://www.travelfoodfashion.com/wp-content/uploads/2014/05/Indonesian-Greetings.jpg'},
    {id:5, topicName: 'Traditions', image: 'http://www.focusonthefamily.ca/images/Family%20traditions%20Page.jpg'},
    {id:6, topicName: 'Animals', image: 'https://i.ytimg.com/vi/O9qnZO87yA8/maxresdefault.jpg'},
    {id:7, topicName: 'Sports', image: 'https://d6vze32yv269z.cloudfront.net/organizations/b0999730-c98f-417c-9dfb-edbfde591991/blocks/9080f135-6087-4d5e-acc5-cacabef54291/hpfulq-1234.jpg'},
    {id:8, topicName: 'Home', image: 'http://hunsci.com/data/out/149/651093.png'}
  ]
};

const decksInfo = (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default decksInfo;


