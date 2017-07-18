import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';

class PracticePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header as="h1">this.props.currentCard.character</Header>
      </div>
    );
  }
}


export default PracticePage;