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
import { selectDeck } from '../actions/actions_practicePage';


class DecksContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var image = 'http://www.freeiconspng.com/uploads/grey-plus-icon-8.png';
    return (
      <Grid verticalAlign="middle" padded>
        <Grid.Row>
          {
            this.props.decksInfo.decks.map((deck) => {
              return (
                <Deck
                  topic={deck.topicName}
                  image={deck.image}
                  key={deck.id}
                />)
            })
          }
          <Deck
            topic={'Create custom deck'}
            image={image}
            key={'customDeck'}
            onDeckSelect={this.props.onDeckSelect}
          />
        </Grid.Row>
      </Grid>
    );
  }
};

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    decksInfo: state.decksInfo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeckSelect: (DeckInfo) => {
      dispatch(selectDeck(DeckInfo));
    }
  };
};

const VisibleDeckPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer);

export default VisibleDeckPage;