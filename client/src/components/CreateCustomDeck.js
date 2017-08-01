import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
// import { Dropdown } from 'semantic-ui-react';
import AllCardsTableList from './AllCardsTableList';
// import { bindActionCreators } from 'redux';
// import { loadCards } from '../actions/actions_customDeck';


class CreateCustomDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: []
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
        // this.props.loadCards(data.allCards)
      })

  }

  render() {
    console.log('it works', this.state.allCards)
    return (
      <Grid verticalAlign="middle" padded>
        <Grid.Row>
          <Grid.Column width={5}>
            <AllCardsTableList />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

}


// const mapStateToProps = (state) => {
//   return {
//     allCards: state.allCards
//   };
// };


// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ loadCards }, dispatch);
// };


// export default connect(null, mapDispatchToProps)(CreateCustomDeck);

export default CreateCustomDeck;

// put this back into onClick prop
// && this.props.onDeckSelect(this.props.key)