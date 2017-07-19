import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const QuickSelectDropdown = (props) => {
  const options = props.deck.cards.map(card => {
    return {
      key: card.positionInDeck,
      text: `${card.character} | ${card.translation}`,
      value: card.positionInDeck
    };
  });
  return (
    <Dropdown
      selection
      options={options}
      placeholder={`${props.currentCard.character} | ${props.currentCard.translation}`}
      onChange={(e, data) => props.onCardSelect(data.value)}
    />
  );
};

export default QuickSelectDropdown;
