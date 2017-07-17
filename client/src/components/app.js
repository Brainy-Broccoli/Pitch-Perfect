import React from 'react';
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

// import Decks
// import Logout Page
// likely additional routes will need to be defined within the decks page 
const App = () => {
  return (
    <Router>
      <div>
        <h1>Hello world from react and REDUX</h1>
        <ul>
          <li><Link to="/">Home</Link> </li>
          <li><Link to="/decks">Decks</Link> </li>
          <li><Link to="/premium-content">Premium Content</Link> </li>
          <li><Link to="/logout">Logout</Link> </li>
        </ul>
      
        <hr/>

        <Route exact path="/" component={Profile}/>
        <Route path="/decks" component={Decks}/>
        <Route path="/premium-content" component={PremiumContent}/>
        <Route path="/logout" component={Logout}/>
      </div>
    </Router>
  );
};

export default App;