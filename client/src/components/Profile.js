import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Grid, Image } from 'semantic-ui-react';

class Profile extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image style={{height: 241, width: 400}} src={this.props.profileInfo.photo}/>
          <div style={{textAlign: 'center', marginTop: 15}}>
            <h2>{this.props.profileInfo.name}</h2>
            <div style={{textAlign: 'center'}}>
              <h3 style={{margin: 0}}> Badges Earned</h3>
              {this.props.profileInfo.badges.map((badge, index) => {
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
            {this.props.profileInfo.mentor.eligible ? <img style={{float: 'right', height: 40, width: 40}} src={this.props.profileInfo.mentor.icon}/> : null}
          </div>
          <hr/>
          <div>
            {this.props.profileInfo.recent.map((recentDeck, idx) => {
              return (
                <Grid key={idx}>
                  <Grid.Column width={7}>
                    <img src={recentDeck.image} style={{height: 200, width: 180, borderStyle: 'groove', borderWidth: 7, borderColor: '#e00000', borderRadius: 10}}/>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <div style={{fontSize: 28}}><b>{recentDeck.deck}</b></div>
                    <div style={{fontSize: 18, marginTop: 44}}>
                      <div><b>Accuracy: </b>{recentDeck.accuracy}</div>
                      <div><b>Progress: </b>{recentDeck.progress} / {recentDeck.total}</div>
                      <div><b>Badge: </b><img src={recentDeck.badge} style={{height: 40, width: 40}}/></div>
                    </div>
                  </Grid.Column>
                </Grid>
              )
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
    profileInfo: state.profileInfo
  };
};

export default connect(mapStateToProps)(Profile);


