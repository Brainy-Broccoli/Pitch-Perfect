import React, { Component } from 'component';

class Lesson extends Component {

  constructor(props) {
    super(props);
    this._actx = new AudioContext();
  }

  componentWillUnmount() {
    this._actx.close();
  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Controls />
          <Grid.Column  textAlign='left' width={14}>
            <canvas width={600} height={400} ref="canvas" style={{
              backgroundColor: this.props.backgroundColor || 'white',
              border: `1px solid #dedede`
            }}></canvas>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ); 
  }

};

export default Lesson;
