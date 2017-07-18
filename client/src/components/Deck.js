import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'

// const Deck = () => {
class Deck extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <Grid.Column width={5}>
        <div>
          <div>
            {this.props.topic}
          </div>
          <div>
            <Image src={this.props.image} />
          </div>
        </div>
      </Grid.Column>
    );
  }
};


export default Deck;