import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Dropdown, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { Dropdown } from 'semantic-ui-react';
import AllCardsTableList from './AllCardsTableList';
import { bindActionCreators } from 'redux';
import { addDeck } from '../actions/actions_customDeck';


class CreateCustomDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: [],
      newDeck: [],
      created: false,
      topic: '',
      image: '',
      badge: ''
    }
  }

  componentDidMount() {
    fetch('/api/cards', { credentials: 'include' })
      .then(res => res.json())
      .then( data => {
        console.log('API CARDS DATA', data.allCards);
        this.setState({
          allCards: data.allCards
        })
      })
  }

  selectCards(cards) {
    if (!this.state.created) {
      this.setState({
        newDeck: cards
      })
    } else {
      this.setState({
        newDeck: cards,
        created: false
      })
    }
  }

  generateDeck() {
    this.setState({
      created: true
    })
  }

  createDeck() {

    let customDeck = this.state.allCards.filter((card) => {
      for (let i = 0; i < this.state.newDeck.length; i++) {
        let currentCard = this.state.newDeck[i];
        if (card.translation === currentCard) {
          return true;
        }
      }
    })
    console.log('all Decks from store retrieved', this.props.allDecks);
    console.log('array of custom cards', customDeck);

    // let deckID = this.props.allDecks.length;
    let createdDeck = {
      // id: deckID + 1,
      progress: null,
      accuracy: null,
      topic: this.state.topic || 'Custom Deck',
      image: this.state.image || 'http://saveabandonedbabies.org/wp-content/uploads/2015/08/default.png',
      badge: this.state.badge || 'https://previews.123rf.com/images/viktorijareut/viktorijareut1508/viktorijareut150800476/44097508-Vector-illustration-of-golden-trophy-cup-for-first-place-with-laurel-wreath-Trophy-icon-Sport-award--Stock-Vector.jpg',
      has_badge: false,
      cards: customDeck
      // total: customDeck.length
    }

    // let decks = this.props.allDecks;
    // decks.push(createdDeck);
    // this.props.addDeck(createdDeck);


    fetch('/api/create-custom-deck', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(createdDeck)
    })
      .then(res => res.json())
      .then( data => {
        data.cards = customDeck;
        data.total = customDeck.length;
        console.log('Client received new deck', data);
        this.props.addDeck(data);
      })


  }

  handleTopic(event) {
    console.log(event.target.value);
    this.setState({
      topic: event.target.value
    })
  }

  handleImage(event) {
    console.log(event.target.value);
    this.setState({
      image: event.target.value
    })
  }

  handleBadge(event) {
    console.log(event.target.value);
    this.setState({
      badge: event.target.value
    })
  }

  render() {
    console.log('it works', this.state.allCards)
    return (
      <Grid padded>
        <Grid.Row style={{minHeight: 200}}>
          <Grid.Column width={10}>
            <Dropdown onChange={(e, data) => this.selectCards(data.value)} placeholder='Select Cards' 
              fluid multiple search selection options={this.state.allCards.map((card) => {
                return { 
                  text: card.translation, 
                  value: card.translation 
                }
              })} 
            />
          </Grid.Column>
          <Grid.Column width={3} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Button onClick={() => this.generateDeck()}>
              Generate Deck!
            </Button>
          </Grid.Column>
        </Grid.Row>
        {
          this.state.created ? 
            <Grid.Row >
              <Grid.Column width={5}>
                <Menu vertical style={{minHeight: 50, maxHeight: 200, 'overflowY': 'scroll', marginLeft: 'auto', marginRight: 'auto'}}>
                  {
                    this.state.newDeck.map((card, index) => {
                      return (<AllCardsTableList key={index} card={card}/>)
                    })
                  }
                </Menu> 
              </Grid.Column>
              <Grid.Column width={5}>
                <Input placeholder='Topic Name' value={this.state.topic} onChange={this.handleTopic.bind(this)}/>
                <Input placeholder='Deck Image (optional)' value={this.state.image} onChange={this.handleImage.bind(this)} style={{marginTop: 5}} />
                <Input placeholder='Deck Badge (optional)' value={this.state.badge} onChange={this.handleBadge.bind(this)} style={{marginTop: 5}}/>
              </Grid.Column>
              <Grid.Column width={3} style={{marginLeft: 'auto', marginRight: 'auto'}}>
                <Link to={`/decks`}>
                  <Button onClick={() => this.createDeck()}>
                    Create Deck!
                  </Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          : null
        }
      </Grid>
    );
  }

}


const mapStateToProps = (state) => {
  return {
    allDecks: state.practicePage.allDecks
  };
};


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addDeck }, dispatch);
};


export default connect(mapStateToProps, mapDispatchToProps)(CreateCustomDeck);

// export default CreateCustomDeck;

