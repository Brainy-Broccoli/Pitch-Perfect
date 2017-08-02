import React, { Commponent } from 'react';

const Controls = ({ recording, playSampleVoice, playUserVoice, record, stopRecording }) => (
  <Grid.Column textAlign='right' width={2}>
    { recording
      ? <Button circular icon='stop' color='red' size='big' onClick={ stopRecording } />
      : <Button circular icon='unmute' color='red' size='big' onClick={ record } />
    }
    <Button circular basic icon='repeat' size='big' style={ {marginTop: `0.5em`} } onClick={ playUserVoice } />
    <Button circular basic icon='volume up' size='big' style={ {marginTop: `0.5em`} } onClick={ playSampleVoice } />
  </Grid.Column>
);

export default Controls;
