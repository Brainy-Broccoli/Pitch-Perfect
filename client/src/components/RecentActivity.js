import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Link} from 'react-router-dom'
import { Grid, Image } from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import { selectPage } from '../actions/actions_navBar';
import { selectRecentActivityDeck } from '../actions/actions_practicePage';

class RecentActivity extends Component {
  render() {
    console.log(this.props.recentDeck.total)
    return (
      <Grid>
        <Grid.Column width={7}>
          <Link to={`/practice-page`}>
            <Image 
              src={this.props.recentDeck.image} 
              style={styles.image}
              onClick={() => this.props.selectPage('Practice Page') && this.props.selectRecentActivityDeck(this.props.topic)} // add selectRecentDeck call here too
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
    selectRecentActivityDeck
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