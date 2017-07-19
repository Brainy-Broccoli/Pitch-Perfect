import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import { selectPage } from '../actions/actions_navBar';

// const Deck = () => {
class Deck extends Component {
  // constructor (props) {
  //   super(props);
  // }
  render() {
    return (
      <Grid.Column width={5}>
        <Link to={`/practice-page`}>
          <Card>
            <div>
              <strong>{this.props.topic}</strong>
            </div>
            <div>
              <Image src={this.props.image} style={{height: 200, width: 400}}
                onClick={() => this.props.selectPage('Practice Page')} />
            </div>
          </Card>
        </Link>
      </Grid.Column>
    );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ selectPage: selectPage }, dispatch);
};

export default connect(null, mapDispatchToProps)(Deck);

// export default Deck;