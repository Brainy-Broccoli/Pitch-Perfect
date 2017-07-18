import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';




class PracticePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      
        <Header as="h1">{this.props.currentDeck.topic}</Header>
        <Header as="h2">{this.props.currentCard.positionInDeck}/{this.props.currentDeck.cards.length}</Header>
      </div>
    );
  }
}


export default PracticePage;