// import { connect } from 'react-redux';

// import your action creating functions

// import the presentational component

// map state to props

// map dispatch to props

// use connect with the above 2 functions and the presentational component you imported

// export the result of the above
import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import Deck from '../components/Deck';


var DummyData = [
  {id:1, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:2, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:3, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:4, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:5, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:6, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:7, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'},
  {id:8, topicName: 'Topic Name', image: 'https://static.pexels.com/photos/20974/pexels-photo.jpg'}
]

const DecksContainer = () => {
  return (
    <Grid>
      <Grid.Row>
        {
          DummyData.map((deck) => {
            return <Deck topic={deck.topicName} image={deck.image} key={deck.id}/>
          })
        }
      </Grid.Row>
    </Grid>
  );
};


export default DecksContainer;