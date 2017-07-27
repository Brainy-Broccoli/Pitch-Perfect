// import { connect } from 'react-redux';

// import your action creating functions

// import the presentational component

// map state to props

// map dispatch to props

// use connect with the above 2 functions and the presentational component you imported

// export the result of the above
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react';
import Deck from '../components/Deck';
import CustomDeck from '../components/CustomDeck';
import { selectDeck } from '../actions/actions_practicePage';

import { Progress } from 'semantic-ui-react'

class DecksContainer extends Component {
  constructor(props) {
    super(props);
    this.image = 'http://www.freeiconspng.com/uploads/grey-plus-icon-8.png';
    this.count = 0;
    this.total = 0;
    this.props.allDecks.forEach((deck) => {
      deck.cards.forEach((card) => {
        this.total++;
        if (card.userAccuracy >= 50) {
          this.count++;
        }
      })
    });
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', margin: 0}}>
          Mentorship Progress: {this.count / this.total * 100}%
        </div>
        <Progress active value={this.count} total={this.total} style={{margin: 0, height: 13}} color='teal' size='small'/>
        <Grid verticalAlign="middle" padded>
          <Grid.Row>
            {
              this.props.allDecks.map((deck, index) => {
                console.log('index of decks', index);
                return (
                  <Deck
                    topic={deck.topic}
                    image={deck.image}
                    dbID={deck.id}
                    index={index}
                    key={index}
                    onDeckSelect={this.props.onDeckSelect}
                  />)
              })
            }
            <CustomDeck
              topic={'Create custom deck'}
              image={this.image}
              key={'customDeck'}
            />
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    allDecks: state.practicePage.allDecks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDeckSelect: (deckIndex) => {
      dispatch(selectDeck(deckIndex));
    }
  };
};

const VisibleDeckPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DecksContainer);

export default VisibleDeckPage;