import React, { Component } from 'react';
import { Grid, Header, Divider, Button, Icon, Label, Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import QuickSelectDropdown from './QuickSelectDropdown';
import AudioGraph from './audio';

class PracticePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(newProps) {
    console.log('receiving new props', newProps);
  }

  render() {
    console.log('practicePage props', this.props);
    return (
      <Grid textAlign='center' columns={2} divided="vertically">
        <Grid.Row>
          <Grid.Column>
            <Header as='h1'>{this.props.currentDeck.topic}</Header>
            <Button.Group size='large'>
            <Button 
              icon='arrow left' 
              onClick={this.props.onPreviousCardSelect}
            />
            <Button basic style={{pointerEvents: `none`}}>{this.props.currentCardIndex + 1}/{this.props.currentDeck.cards.length}</Button>
            <Button 
              icon='arrow right' 
              onClick={this.props.onNextCardSelect}
            />
          </Button.Group>
          
          </Grid.Column>
          <Grid.Column>
            <QuickSelectDropdown 
              deck={this.props.currentDeck} 
              currentCard={this.props.currentCard}
              onCardSelect={this.props.onCardSelect}
            />
          <Statistic style = {{marginLeft: '5em'}}> 
            <Statistic.Value>{this.props.cardHighScore || '--' }</Statistic.Value>
            <Statistic.Label>Highscore</Statistic.Label>
          </Statistic>
          </Grid.Column>  
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={5}> 
            <Header style={{fontSize: `10em`}}>{this.props.currentCard.character}</Header>
            <Header as='h3'>IPA/Pinyin: {this.props.currentCard.IPA}/{this.props.currentCard.pinyin}</Header>
            <Header as='h3'>{this.props.currentCard.translation}</Header>
          </Grid.Column>
          <Grid.Column width={11}>
            <AudioGraph currentCard={this.props.currentCard}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapping state to props in the practice page');
  return {
    cardHighScore: state.practicePage.currentCard.high_score,
  };
};


export default connect(mapStateToProps, null)(PracticePage);
