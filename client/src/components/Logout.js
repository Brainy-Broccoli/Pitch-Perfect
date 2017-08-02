import React, { Component } from 'react';

class Logout extends Component {

  componentDidMount() {
    fetch('/logout')
      .then(() => {
        console.log('logged out')
      })
  }
  render() {
    return (
      <div>
        <h1>This is the Logout page</h1>
      </div>
    );
  }
};

export default Logout;