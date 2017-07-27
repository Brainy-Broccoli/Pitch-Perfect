import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Image } from 'semantic-ui-react';

import RecentActivity from './RecentActivity';

class Profile extends Component {
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
                : ""
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
  // Whatever is returned will show up as props 
  return {
    profileInfo: state.profileInfo,
    recentDecks: state.practicePage.recentUserDecksInfo
  };
};

export default connect(mapStateToProps)(Profile);


