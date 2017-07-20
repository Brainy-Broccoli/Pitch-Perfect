import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const QuickSelectDropdown = (props) => {
  const options = props.deck.cards.map((card, index) => {
    return {
      key: index,
      text: `${card.character} | ${card.translation}`,
      value: index
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
