import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const QuickSelectDropdown = (props) => {
  const options = props.deck.cards.map((card, index) => {
    return {
      key: index,
      id: index,
      text: `${card.character} | ${card.translation}`,
      value: index
    };
  });
  return (
    <Dropdown
      selection
      options={options}
      placeholder={`${props.currentCard.character} | ${props.currentCard.translation}`}
      onChange={(e, data) => {console.log('data value on the card', data.value) || props.onCardSelect(data.value)} }
    />
  );
};

export default QuickSelectDropdown;
