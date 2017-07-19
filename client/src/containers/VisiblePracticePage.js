import { connect } from 'react-redux';
// import action creators -- can bind them here and pass down as props through mapDispatchToProps
import { selectCard } from '../actions/actions_practicePage';
// import the presentational component to connect it
import PracticePage from '../components/PracticePage';

const mapStateToProps = (state) => {
  console.log('state tree', state);
  return {
    currentCard: state.practicePage.currentCard,
    currentDeck: state.practicePage.currentDeck
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCardSelect: (cardPos) => {
      dispatch(selectCard(cardPos));
    }
  };
};

const VisiblePracticePage = connect(
  mapStateToProps, 
  mapDispatchToProps
)(PracticePage);

export default VisiblePracticePage;