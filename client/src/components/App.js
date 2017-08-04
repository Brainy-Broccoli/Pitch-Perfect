import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// we will import each of the 'page level' components here and have routes for each of them
// e.g. import 'Profile' from ./Profile.js etc etc
import Profile from './Profile';
import DecksContainer from '../containers/DecksContainer';
import PremiumContent from './PremiumContent';
import CreateCard from './CreateCard';
import Logout from './Logout';
import VisiblePracticePage from '../containers/VisiblePracticePage';
import CreateCustomDeck from './CreateCustomDeck';

import { Menu, Segment } from 'semantic-ui-react';

import { selectPage } from '../actions/actions_navBar';
import { loadProfile } from '../actions/actions_profilePage.js';
import { loadPracticePage } from '../actions/actions_practicePage.js';
// import Decks
// import Logout Page
// likely additional routes will need to be defined within the decks page
class App extends Component {

  componentDidMount() {
    let practicePageState;
    fetch('/api/profileInfo', { credentials: 'include' })
      .then(res => res.json())
      .then( data => {
        console.log('all decks data has been fetched', data);
        const name = data.display;
        const badgeUrls = data.decks.filter( deck => deck.has_badge ).map( deck => deck.badge);
        const photo = data.photo || 'https://www.cbdeolali.org.in/drupal/sites/default/files/Section%20Head/Alternative-Profile-pic_5.jpg';
        const isMentor = data.decks.filter( deck => deck.default ).every(deck => deck.has_badge); // TODO: FIX ME OR DIE -- need to determine final mentor criteria
        const profileState = { name, badgeUrls, photo, isMentor };

        this.props.loadProfile(profileState);

        practicePageState = {
          currentDeck: data.decks[0],
          currentCardIndex: 0,
          currentCard: data.decks[0].cards[0],
          allDecks: data.decks,
        };
        // finally, need to get the recent deck information
        return fetch('/api/recentDecks', {credentials: 'include'});
      })
      .then(res => res.json())
      .then(recentDecks => {
        console.log('recent deck information has been fetched', recentDecks);
        practicePageState.recentUserDecksInfo = recentDecks;
        this.props.loadPracticePage(practicePageState);
      })
      .catch(err => console.log('error retrieving all information', err));
  }

  render() {
    return (
      <Router>
        <div>
          <Menu pointing secondary>
            <Menu.Item name='home' as={Link} to='/' active={this.props.activePage === 'home'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Item name='decks' as={Link} to='/decks' active={this.props.activePage === 'decks'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            {/*<Menu.Item name='Premium' as={Link} to='/premium-content' active={this.props.activePage === 'Premium'} 
                          onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> */}
            <Menu.Item name='Practice Page' as={Link} to='/practice-page' active={this.props.activePage === 'Practice Page'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Item name='Create Card' as={Link} to='/create-card' active={this.props.activePage === 'Create Card'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Menu position='right'>
              <Menu.Item href="/logout" name='logout' active={this.props.activePage === 'logout'} 
                onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/>
            </Menu.Menu>
          </Menu>


          <Segment>
            <Route exact path="/" component={Profile}/>
            <Route path="/decks" component={DecksContainer}/>
            <Route path="/premium-content" component={PremiumContent}/>
            <Route path="/practice-page" component={VisiblePracticePage}/>
            {/*<Route path="/logout" component={Logout}/>*/}
            <Route path="/create-custom-deck" component={CreateCustomDeck}/>
            <Route path="/create-card" component={CreateCard}/>
          </Segment>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    activePage: state.activePage
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ selectPage, loadProfile, loadPracticePage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);


