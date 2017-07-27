import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image } from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { selectPage } from '../actions/actions_navBar';
import { receiveUpdatedRecentDecks } from '../actions/actions_practicePage';

// const Deck = () => {
class Deck extends Component {
  constructor (props) {
    super(props);
  }
  handleDeckClick() {
    this.props.selectPage('Practice Page');
    this.props.onDeckSelect(this.props.id);
    const endpoint = '/api/recentDecks';
    const postBody = {
      topic: this.props.topic,
      timestamp: Date.now()
    };

    const postJSON = (endpoint, body) => {
      return fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(body),
      })
        .then(res => {
          if (res.ok) {
            return res.text();
          } 
          throw new Error('dumb didnt work');
        })
        .then(responseText => {
          // now send the get request
          fetch(endpoint, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            credentials: 'include'
          })
            .then(res => res.json())
            .then(recentDeckInfo => {
              console.log('here is the new recent decks', recentDeckInfo);
              this.props.receiveUpdatedRecentDecks(recentDeckInfo);
            })
            .catch(err => console.error('get request for recent decks failed', err));
        })
        .catch( err => console.error('Something broke: ', err));
    };
    console.log('sending post request to update recent decks');
    postJSON('/api/recentDecks', postBody);
  }
  render() {
    return (
      <Grid.Column width={5}>
        <Link to={`/practice-page`}>
          <Card>
            <div style={{textAlign: 'center'}}>
              <strong>{this.props.topic}</strong>
            </div>
            <div>
              <Image src={this.props.image} style={{height: 200, width: 400}}
                onClick={this.handleDeckClick.bind(this)}
              />
            </div>
          </Card>
        </Link>
      </Grid.Column>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPage, receiveUpdatedRecentDecks }, dispatch);
};

export default connect(null, mapDispatchToProps)(Deck);

// export default Deck;

// put this back into onClick prop
// && this.props.onDeckSelect(this.props.key)