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
import Logout from './Logout';
import VisiblePracticePage from '../containers/VisiblePracticePage';

import { Menu, Segment } from 'semantic-ui-react';

import { selectPage } from '../actions/actions_navBar';
// import Decks
// import Logout Page
// likely additional routes will need to be defined within the decks page 
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Menu pointing secondary>
            <Menu.Item name='home' as={Link} to='/' active={this.props.activePage === 'home'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Item name='decks' as={Link} to='/decks' active={this.props.activePage === 'decks'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Item name='Premium' as={Link} to='/premium-content' active={this.props.activePage === 'Premium'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Item name='Practice Page' as={Link} to='/practice-page' active={this.props.activePage === 'Practice Page'} 
              onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            <Menu.Menu position='right'>
              <Menu.Item name='logout' as={Link} to='/logout' active={this.props.activePage === 'logout'} onClick={(event, itemProps) => this.props.selectPage(itemProps.name)}/> 
            </Menu.Menu>
          </Menu>


          <Segment>
            <Route exact path="/" component={Profile}/>
            <Route path="/decks" component={DecksContainer}/>
            <Route path="/premium-content" component={PremiumContent}/>
            <Route path="/practice-page" component={VisiblePracticePage}/>
            <Route path="/logout" component={Logout}/>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPage: selectPage }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);


