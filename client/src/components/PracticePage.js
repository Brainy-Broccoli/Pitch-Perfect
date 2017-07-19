import React, { Component } from 'react';
import { Grid, Header, Divider, Button, Icon } from 'semantic-ui-react';
import QuickSelectDropdown from './QuickSelectDropdown';



class PracticePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid textAlign='center' columns={3} divided>
        <Grid.Row>
          <Grid.Column> 
            <Header as='h1'>{this.props.currentCard.character}</Header>
            <Header as='h2'>IPA/Pinyin: {this.props.currentCard.IPA}/{this.props.currentCard.pinyin}</Header>
            <Header as='h2'>{this.props.currentCard.translation}</Header>
          </Grid.Column>
          <Grid.Column>
            <Button 
              content='Prev Card' 
              icon='arrow left' 
              labelPosition='left'
              onClick={this.props.onPreviousCardSelect}
            />
            <Header as='h1'>{this.props.currentDeck.topic}</Header>
            <Header as='h2'>{this.props.currentCardIndex + 1}/{this.props.currentDeck.cards.length}</Header>
            <Button 
              content='Next Card' 
              icon='arrow right' 
              labelPosition='right'
              onClick={this.props.onNextCardSelect}
            />
          </Grid.Column>
          <Grid.Column>
            <QuickSelectDropdown 
              deck={this.props.currentDeck} 
              currentCard={this.props.currentCard}
              onCardSelect={this.props.onCardSelect}
            />
          </Grid.Column>  
        </Grid.Row>
      </Grid>
    );
  }
}


export default PracticePage;