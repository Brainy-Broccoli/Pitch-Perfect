import React from 'react';
import * as pf from 'pitchfinder';
import { Grid, Button } from 'semantic-ui-react';

class AudioGraph extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      recording: false,
    };

    this.record = this.record.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.draw = this.draw.bind(this);

    this.audioCtx = new AudioContext();
    this.stream = null;
    this.buffer = null;
    this.analyser = null;

    this.timerID = null;
    this.startTime = null;
    this.recordedPitchData = [];

  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='center' width={2}>
              { this.state.recording
                ? <Button circular icon='stop' color='red' onClick={this.stopRecording} />
                : <Button circular icon='unmute' color='red' onClick={this.record} />
              }
              <Button circular icon='settings' />
          </Grid.Column>
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

  record() {
    if (!this.state.recording) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then( stream => {
          this.stream = stream;
          this.recordedPitchData = [];
          this.setState({
            recording: true,
            recordedAudioData: [],
          });

          const recordingNode = this.audioCtx.createMediaStreamSource(stream);

          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 1024;
          this.buffer = new Float32Array(this.analyser.fftSize); 

          recordingNode.connect(this.analyser);

          //UNCOMMENT THIS LINE TO FORWARD AUDIO TO OUTPUT
          //================================================
          //
          //this.analyser.connect(this.audioCtx.destination)

          this.startTime = performance.now();
          this.timerID = requestAnimationFrame(this.draw)

      })
      .catch( err => {
        console.error('Oops something broke ', err);
      });
    } 
  }

  stopRecording() {
    if(this.state.recording) {
      console.log('Stop:');
      this.stream.getTracks().forEach(track => {track.stop()});
      this.setState({
        recording: false
      }); 
      cancelAnimationFrame(this.timerID); 
    }
  }

  draw() {

    this.analyser.getFloatTimeDomainData(this.buffer);
    const dt = performance.now() - this.startTime; 
    const detectPitch = new pf.AMDF();
    const pitch = detectPitch(this.buffer);
    this.recordedPitchData.push({f: pitch, t: dt});
    const maxTime = (this.props.maxTimeInSeconds || 6) * 1000;

    const canvas = this.refs.canvas;
    const gqCtx = canvas.getContext('2d');

    if (dt >= maxTime) { 
      this.stopRecording();
      return;
    }

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
  
    gqCtx.fillStyle = this.props.backgroundColor || 'white';
    gqCtx.fillRect(0, 0, WIDTH, HEIGHT);
    gqCtx.lineWidth = this.props.strokeWidth || 3;

    const lastPitch = this.recordedPitchData[this.recordedPitchData.length - 1];
    const cursorX = Math.ceil(lastPitch.t / (maxTime / WIDTH));
    const cursorY = Math.ceil(lastPitch.f ?HEIGHT-Math.ceil(lastPitch.f) : HEIGHT);
    
    /*  This enables cursor to move along x axis as time passes
    gqCtx.strokeStyle = 'rgb(0, 0, 255)';
    gqCtx.beginPath();
    gqCtx.moveTo(cursor,0);
    gqCtx.lineTo(cursor,HEIGHT);
    gqCtx.stroke();
    */
    gqCtx.strokeStyle = 'rgb(255, 0, 0)';

    gqCtx.beginPath();
    const renderedData = {};
    this.recordedPitchData.forEach( pitchAtTime => {
      let px = Math.ceil(pitchAtTime.t / (maxTime / WIDTH));
      if (!renderedData[px]) {
        console.log(pitchAtTime.f)
        gqCtx.lineTo(px, (pitchAtTime.f ? HEIGHT - Math.ceil(pitchAtTime.f) : HEIGHT));
        renderedData[px] = true; 
      }
    });
    gqCtx.arc(cursorX, cursorY, 5, 0, 2*Math.PI);
    gqCtx.stroke();

    this.timerID = requestAnimationFrame(this.draw)
  }
}

export default AudioGraph; 
