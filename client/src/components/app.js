import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
// we will import each of the 'page level' components here and have routes for each of them
// e.g. import 'Profile' from ./Profile.js etc etc
import Profile from './Profile';
import Decks from './Decks';
import PremiumContent from './PremiumContent';
import Logout from './Logout';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Menu, Segment } from 'semantic-ui-react';

// import Decks
// import Logout Page
// likely additional routes will need to be defined within the decks page 
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Menu pointing secondary>
            <Menu.Item name='home' as={Link} to='/' /> 
            <Menu.Item name='decks' as={Link} to='/decks' /> 
            <Menu.Item name='Premium' as={Link} to='/premium-content' /> 
            <Menu.Menu position='right'>
              <Menu.Item name='logout' as={Link} to='/logout' /> 
            </Menu.Menu>
          </Menu>
        
          <hr/>

          <Route exact path="/" component={Profile}/>
          <Route path="/decks" component={Decks}/>
          <Route path="/premium-content" component={PremiumContent}/>
          <Route path="/logout" component={Logout}/>
        </div>
      </Router>
    );
  }
};

export default App;


