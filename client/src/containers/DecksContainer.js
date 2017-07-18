// import { connect } from 'react-redux';

// import your action creating functions

// import the presentational component

// map state to props

// map dispatch to props

// use connect with the above 2 functions and the presentational component you imported

// export the result of the above
import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import Deck from '../components/Deck';

const DecksContainer = (props) => {
  var image = 'http://www.freeiconspng.com/uploads/grey-plus-icon-8.png';
  return (
    <Grid>
      <Grid.Row>
        {
          props.decksInfo.decks.map((deck) => {
            return <Deck topic={deck.topicName} image={deck.image} key={deck.id}/>
          })
        }
        <Deck topic={'Create custom deck'} image={image} key={'customDeck'}/>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    decksInfo: state.decksInfo
  };
};

export default connect(mapStateToProps)(DecksContainer);