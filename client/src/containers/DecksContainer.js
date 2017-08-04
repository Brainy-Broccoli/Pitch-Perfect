// import { connect } from 'react-redux';
// import your action creating functions
// import the presentational component
// map state to props
// map dispatch to props
// use connect with the above 2 functions and the presentational component you imported
// export the result of the above
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Image, Progress } from 'semantic-ui-react';

import Deck from '../components/Deck';
import CustomDeck from '../components/CustomDeck';

import { selectDeck } from '../actions/actions_practicePage';
import { loadProfile } from '../actions/actions_profilePage.js';
import { loadPracticePage } from '../actions/actions_practicePage.js';

class DecksContainer extends Component {
  constructor(props) {
    super(props);
    this.image = 'http://www.freeiconspng.com/uploads/grey-plus-icon-8.png';
  }
  // componentDidMount() {
  //   let practicePageState;
  //   fetch('/api/decks', { credentials: 'include' })
  //     .then(res => res.json())
  //     .then( data => {
  //       console.log('Decks from the server', data);
  //       if (this.props.current) {
  //         practicePageState = {
  //           deckIndex: this.props.current,
  //           currentDeck: data[this.props.current],
  //           currentCardIndex: 0,
  //           allDecks: data,
  //         }
  //       } else {
  //         console.log('ASDFASDF', this.props.allDecks);
  //         practicePageState = {
  //           deckIndex: 0,
  //           currentDeck: this.props.allDecks[0],
  //           currentCardIndex: 0,
  //           currentCard: this.props.allDecks[0].cards[0],
  //           allDecks: this.props.allDecks,
  //         }
  //       }
  //       this.props.loadPracticePage(practicePageState);
  //     })
  //     .catch(err => console.log('error retrieving all information', err));
  // }


  componentDidMount() {
    let practicePageState;
    fetch('/api/profileInfo', { credentials: 'include' })
      .then(res => res.json())
      .then( data => {
        practicePageState = {
          currentDeck: data.decks[this.props.deckIndex || 0],
          currentCardIndex: 0,
          currentCard: data.decks[this.props.deckIndex || 0].cards[0],
          allDecks: data.decks,
        };
        // finally, need to get the recent deck information
        return fetch('/api/recentDecks', {credentials: 'include'});
      })
      .then(res => res.json())
      .then(recentDecks => {
        practicePageState.recentUserDecksInfo = recentDecks;
        this.props.loadPracticePage(practicePageState);
      })
      .catch(err => console.log('error retrieving all information', err));
  }
  render() {
    let count = 0;
    let total = 0;
    this.props.allDecks.forEach((deck) => {
      deck.cards.forEach((card) => {
        total++;
        if (card.high_score >= 80) {
          count++;
        }
      });
    });
    return (
      <div>
        <div style={{textAlign: 'center', margin: 0}}>
          Mentorship Progress: {count / total * 100}%
        </div>
        <Progress active value={count} total={total} style={{marginTop: 10, marginBottom: -5, height: 13}} color='teal' size='small'/>
        <Grid columns="equal" verticalAlign="middle" padded centered>
          <Grid.Row columns={3}>
            {
              this.props.allDecks.map((deck, index) => {
                return (
                  <Deck
                    topic={deck.topic}
                    image={deck.image}
                    dbID={deck.id}
                    index={index}
                    key={index}
                    onDeckSelect={() => this.props.selectDeck(index)}
                  />
                );
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
}

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    allDecks: state.practicePage.allDecks,
    deckIndex: state.practicePage.deckIndex
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectDeck, loadPracticePage, loadProfile }, dispatch);
  // return {
  //   onDeckSelect: (deckIndex) => {
  //     dispatch(selectDeck(deckIndex));
  //   }
  // };
};

export default connect(mapStateToProps, mapDispatchToProps)(DecksContainer);

