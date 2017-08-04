import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
const Sound = require('react-sound').default;


class Controls extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      sound: false,
    };
    this.finishedPlaying = this.finishedPlaying.bind(this);
    this.onSoundClick = this.onSoundClick.bind(this);
  } 
  onSoundClick() {
    this.setState({
      sound: true
    });
  }

  finishedPlaying() {
    this.setState({
      sound: false
    });
  }

  render() {
    const { recording, playSampleVoice, playUserVoice, record, stopRecording } = this.props;
    return (<Grid.Column textAlign='right' width={2}>
      { recording
        ? <Button circular icon='stop' color='red' size='big' onClick={ stopRecording } />
        : <Button circular icon='unmute' color='red' size='big' onClick={ record } />
      }
      {
        this.state.sound
          ? <Sound
              url={this.props.femaleVoice}
              playStatus={Sound.status.PLAYING}
              onFinishedPlaying={this.finishedPlaying}/>
          : null
      }
      <Button circular basic icon='repeat' size='big' style={ {marginTop: `0.5em`} } onClick={ playUserVoice } />
      <Button circular basic icon='volume up' size='big' style={ {marginTop: `0.5em`} } onClick={ this.onSoundClick } />
    </Grid.Column>
    );
  }
}

export default Controls;
