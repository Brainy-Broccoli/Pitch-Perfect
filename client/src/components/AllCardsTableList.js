import React from 'react';
import { Segment, Menu, Dropdown } from 'semantic-ui-react';

const AllCardsTableList = (props) => {
  return (<Menu.Item style={{textAlign: 'center'}}> {props.card} </Menu.Item>);
};

export default AllCardsTableList;
