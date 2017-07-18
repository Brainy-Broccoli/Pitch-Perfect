import { connect } from 'react-redux';
// import action creators -- can bind them here and pass down as props through mapDispatchToProps
// import the presentational component to connect it
import PracticePage from '../components/PracticePage';

const mapStateToProps = (state) => {
  return {
    currentCard: state.currentCard,
    currentDeck: state.currentDeck
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const VisiblePracticePage = connect(
  mapStateToProps, 
  mapDispatchToProps
)(PracticePage);

export default VisiblePracticePage;