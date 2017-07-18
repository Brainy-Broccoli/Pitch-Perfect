import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Grid, Image } from 'semantic-ui-react'

// const Deck = () => {
class Deck extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <Grid.Column width={5}>
        <Card>
          <div>
            <strong>{this.props.topic}</strong>
          </div>
          <div>
            <Image src={this.props.image} style={{height: 200, width: 400}} />
          </div>
        </Card>
      </Grid.Column>
    );
  }
};


export default Deck;