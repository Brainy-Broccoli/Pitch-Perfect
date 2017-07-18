import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Image } from 'semantic-ui-react'

class Profile extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={4}>
          <Image src={this.props.profile.photo}/>
          {this.props.profile.name}
          <div>
          </div>
        </Grid.Column>
        <Grid.Column width={9}>
          {this.props.profile.badges}
          <div>
            {this.props.profile.mentor}
          </div>
          <div>
            {this.props.profile.recent}
          </div>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    profile: state.profileInfo
  };
};

export default connect(mapStateToProps)(Profile);