import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import { selectPage } from '../actions/actions_navBar';
import { selectRecentActivityDeck, receiveUpdatedRecentDecks } from '../actions/actions_practicePage';

class RecentActivity extends Component {
  constructor(props) {
    super(props);
  }

  handleRecentDeckClick() {
    this.props.selectPage('Practice Page');
    this.props.selectRecentActivityDeck(this.props.topic);

    // also send a post request to the api endpoint to update recent deck activity
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
      <Grid>
        <Grid.Column width={7}>
          <Link to={`/practice-page`}>
            <Image 
              src={this.props.recentDeck.image} 
              style={styles.image}
              onClick={this.handleRecentDeckClick.bind(this)} // add selectRecentDeck call here too
            />
          </Link>
        </Grid.Column>
        <Grid.Column width={8}>
          <div style={{fontSize: 28}}><b>{this.props.recentDeck.topic}</b></div>
          <div style={{fontSize: 18, marginTop: 44}}>
            <div><b>Accuracy: </b>{this.props.recentDeck.accuracy}</div>
            <div><b>Progress: </b>{this.props.recentDeck.progress} / {this.props.recentDeck.total}</div>
            <div><b>Badge: </b><Image src={this.props.recentDeck.badge} style={{height: 40, width: 40}}/></div>
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ 
    selectPage,
    selectRecentActivityDeck,
    receiveUpdatedRecentDecks
  }, dispatch);
};

export default connect(null, mapDispatchToProps)(RecentActivity);

let styles = {
  image: {
    height: 200,
    width: 180, 
    borderStyle: 'groove', 
    borderWidth: 7, 
    borderColor: '#e00000', 
    borderRadius: 10
  }
};
