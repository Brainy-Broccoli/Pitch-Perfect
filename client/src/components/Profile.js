import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Image } from 'semantic-ui-react';

class Profile extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image style={{height: 241, width: 400}} src={this.props.profileInfo.photo}/>
          {this.props.profileInfo.name}
          <div>
          </div>
        </Grid.Column>
        <Grid.Column width={9}>
          <div>
            {this.props.profileInfo.mentor.illegible ? <img style={{height: 40, width: 40}} src={this.props.profileInfo.mentor.icon}/> : null}
          </div>
          {this.props.profileInfo.badges.map((badge, index) => {
            return (<img key={index} style={{display: 'inline-block', height: 25, width: 25}} src={badge} />);
          })}
          <div>
            {this.props.profileInfo.recent.map((recentDeck, idx) => (<div key={idx}>lmao</div>) )}
          </div>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    profileInfo: state.profileInfo
  };
};

export default connect(mapStateToProps)(Profile);
