import React, { Component } from 'react';
import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import { Grid, Image } from 'semantic-ui-react';

import RecentActivity from './RecentActivity';

import { loadProfile } from '../actions/actions_profilePage.js';
import { loadPracticePage } from '../actions/actions_practicePage.js';


class Profile extends Component {

  componentDidMount() {
    let practicePageState;
    fetch('/api/profileInfo', { credentials: 'include' })
      .then(res => res.json())
      .then( data => {
        console.log('fetching data');
        const name = data.display;
        const badgeUrls = data.decks.filter( deck => deck.has_badge ).map( deck => deck.badge);
        const photo = data.photo || 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg';
        const isMentor = data.decks.filter( deck => deck.default ).every(deck => deck.has_badge); // TODO: FIX ME OR DIE -- need to determine final mentor criteria
        const profileState = { name, badgeUrls, photo, isMentor };
        practicePageState = {
          currentDeck: data.decks[0],
          currentCardIndex: 0,
          currentCard: data.decks[0].cards[0],
          allDecks: data.decks,
        };
        this.props.loadProfile(profileState);
        return fetch('/api/recentDecks', {credentials: 'include'});
      }).then( res => res.json() )
      .then(recentDecks => {
        practicePageState.recentUserDecksInfo = recentDecks;
        this.props.loadPracticePage(practicePageState);
      })
      .catch(err => console.log('error retrieving all information', err));
  }

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image style={{width: 400}} src={this.props.profileInfo.photo}/>
          <div style={{textAlign: 'center', marginTop: 15}}>
            <h2>{this.props.profileInfo.name}</h2>
            <div style={{textAlign: 'center'}}>
              <h3 style={{margin: 0}}> Badges Earned</h3>
              {this.props.profileInfo.badgeUrls.map((badge, index) => {
                return (<img key={index} style={{display: 'inline-block', height: 40, width: 40}} src={badge} />);
              })}
            </div>
          </div>
          <div>
          </div>
        </Grid.Column>
        <Grid.Column width={10}>
          <div style={{textAlign: 'center'}}>
            <h2 style={{display: 'inline-block'}}> Recent Activity </h2>
            {this.props.profileInfo.isMentor 
              ? <img style={{float: 'right', height: 40, width: 40}} src="https://s3-us-west-1.amazonaws.com/pitch-perfect-thesis/mentor.jpg"/> 
              : ''
            }
          </div>
          <hr/>
          <div>
            {this.props.recentDecks.map((recentDeck, idx) => {
              return (
                <RecentActivity 
                  key={idx} 
                  recentDeck={recentDeck} 
                  topic={recentDeck.topic}
                  dbID={recentDeck.dbID}
                />
              );
            })}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    profileInfo: state.profileInfo,
    recentDecks: state.practicePage.recentUserDecksInfo
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ loadProfile, loadPracticePage }, dispatch);

};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);


