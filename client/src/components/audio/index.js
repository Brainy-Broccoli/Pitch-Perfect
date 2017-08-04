import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import regression from 'regression';
import { connect } from 'react-redux';
import record from './utils/record';
import Controls from './Controls';
import { compareRegressions } from './utils/compareRegressions';
class AudioGraph extends React.Component {

  constructor(props) {
    super(props);
    console.log('model pitch data', this.props.modelPitchData);
    console.log('model regression coefficients', this.props.modelRegressionCoefficents);
    console.log('length of this recording', this.props.recordingLength);
    this.state = {
      recording: false,
      readyToPlay: false,
      score: 0,
    };

    this.userCoefficients = null;

    this.audioCtx = new AudioContext();
    this.recorder = null;

    this.record = this.record.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.doThingsWithBlobAndPitch = this.doThingsWithBlobAndPitch.bind(this);
    this.playSampleVoice = this.playSampleVoice.bind(this);
    //this.onSoundClick = this.onSoundClick.bind(this);
    this.playUserVoice = this.playUserVoice.bind(this);
    this.draw = this.draw.bind(this);
  }
  componentWillReceiveProps() {
    console.log('ASLDIJFALKSJDF');
    setTimeout(() => this.draw([]), 10);
  }

  componentDidMount() {
    this.draw([], true); // This will draw just the model regression
  }

  componentWillUnmount() {
    this.audioCtx.close();
  }

  playUserVoice() {
    if (this.state.readyToPlay) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        this.source = this.audioCtx.createBufferSource();
        const arrayBuffer = fileReader.result;
        this.audioCtx.decodeAudioData(arrayBuffer)
          .then(audioData => {
            this.source.buffer = audioData;
            this.source.connect(this.audioCtx.destination);
            this.source.start(0);
          }); 
      };
      fileReader.readAsArrayBuffer(this.userVoiceBlob);
    }
  }

  record() {
    console.log('recording');
    if (!this.state.recording) {
      this.setState({
        recording: true,
      });
      this.startTime = performance.now();
      record(this.doThingsWithBlobAndPitch).then( recorder => { 
        setTimeout(this.stopRecording, this.props.recordingLength || 1000);
        this.recorder = recorder; 
      });
      // this.timerID = requestAnimationFrame(this.draw);
    }
  }

  doThingsWithBlobAndPitch({blob, data}) {
    this.draw(data);
    this.userVoiceBlob = blob;
  }

  stopRecording() {
    console.log('stop recording', this, this.recorder);
    if (this.state.recording) {
      this.recorder.stop();
      this.setState({
        recording: false,
        readyToPlay: true,
      });
      // cancelAnimationFrame(this.timerID);
    }
  }

  playSampleVoice() {
    console.log(this.props.linkToSampleVoiceData);
    console.log('clicked on play sample voice');
    fetch(this.props.linkToSampleVoiceData)
      .then(res => res.blob())
      .then(blobData => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
          this.source = this.audioCtx.createBufferSource();
          const arrayBuffer = fileReader.result;
          this.audioCtx.decodeAudioData(arrayBuffer)
            .then(audioData => {
              this.source.buffer = audioData;
              this.source.connect(this.audioCtx.destination);
              this.source.start(0);
            }); 
        };
        fileReader.readAsArrayBuffer(blobData);
      });
  }

  update() {

  }

  draw(frequencyData, pre) {
    const regressMe = frequencyData.filter(a=>a.freq).map(datum => [datum.time, datum.freq]);
    const reg = regression.polynomial(regressMe, { order: 3, precision: 4 });
    const coefficients = (reg.equation);
    
    //take the coefficents from the user generated data and pass that into reg 1
    const calc = x => (coefficients.reduce( (acc, co, i) => acc += (co * Math.pow(x, coefficients.length - (i + 1))), 0));

    const MAX_FREQ = 350;
    const maxTime = this.props.recordingLength || 1000;

    const canvas = this.refs.canvas;
    const gqCtx = canvas.getContext('2d');

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    gqCtx.fillStyle = this.props.backgroundColor || 'white';
    gqCtx.fillRect(0, 0, WIDTH, HEIGHT);
    gqCtx.lineWidth = this.props.strokeWidth || 3;
    
    // Draws raw pitch data
    gqCtx.strokeStyle = 'rgb(255, 0, 0)';
    gqCtx.beginPath();

    const usedPixels = {};

    frequencyData.forEach( frequency => {
      let px = Math.ceil( (frequency.time * 1000) / (maxTime / WIDTH));
      if (!usedPixels[px]) {
        gqCtx.lineTo(px, (frequency.freq ? HEIGHT - Math.ceil(frequency.freq * (HEIGHT / MAX_FREQ)) : HEIGHT));
        usedPixels[px] = true;
      }
    });
    gqCtx.stroke();

    // Draws regression of user frequency data
    gqCtx.strokeStyle = 'rgb(127, 255, 0)';
    gqCtx.beginPath();
    const usedPixels2 = {};

    frequencyData.forEach( frequency => {
      let px = Math.ceil( (frequency.time * 1000) / (maxTime / WIDTH));
      if (!usedPixels2[px]) {
        gqCtx.lineTo(px, HEIGHT - Math.ceil(calc(frequency.time) * (HEIGHT / MAX_FREQ)));
        usedPixels2[px] = true;
      }
    });
    gqCtx.stroke();


    // Draws regression of model frequency data
    gqCtx.strokeStyle = 'rgb(0, 0, 255)';
    gqCtx.beginPath();
    const usedPixels3 = {};
    const modelCoefficients = this.props.modelRegressionCoefficents;
    const modelCalc = x => (modelCoefficients.reduce( (acc, co, i) => acc += (co * Math.pow(x, modelCoefficients.length - (i + 1))), 0));
    if (this.props.modelPitchData) {
      this.props.modelPitchData.forEach( frequency => {
        let px = Math.ceil( (frequency.time * 1000) / (maxTime / WIDTH));
        if (!usedPixels3[px]) {
          gqCtx.lineTo(px, HEIGHT - Math.ceil(modelCalc(frequency.time) * (HEIGHT / MAX_FREQ)));
          usedPixels3[px] = true;
        }
      });
      gqCtx.stroke();
    }
    if (!pre) {
      const score = compareRegressions(coefficients, this.props.modelRegressionCoefficents, this.props.modelPitchData);
      console.log(score);
      this.setState({ 
        score,
      });
      
      fetch(`/api/card/${this.props.cardID}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ score: Math.floor(score)}),
      }).then( res => console.log(res) )
        .catch( res => console.error(res) );
      //end of drawing -- now need to display the results of the comparison 
    }
  }



  render() {
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Controls playUserVoice={ this.playUserVoice } femaleVoice = {this.props.linkToSampleVoiceData} playSampleVoice={ this.playSampleVoice } record={ this.record } recording={ this.state.recording } stopRecording={ this.stopRecording}/>
          <Grid.Column textAlign='left' width={14}>
            <canvas width={600} height={400} ref="canvas" style={{
              backgroundColor: this.props.backgroundColor || 'white',
              border: '1px solid #dedede'
            }}></canvas>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    ); 
  }
}
const mapStateToProps = (state) => {
  const femalePitchData = state.practicePage.currentCard.female_pitch_data;
  return {
    cardID: state.practicePage.currentCard.id,
    linkToSampleVoiceData: state.practicePage.currentCard.female_voice,
    modelPitchData: state.practicePage.currentCard.female_pitch_data,
    modelRegressionCoefficents: state.practicePage.currentCard.regression,
    recordingLength: (femalePitchData && (femalePitchData[femalePitchData.length - 1]['time'] * 1000)) || 1000, // could be trying to read pitch data for a card that hasn't been updated yet (via the sample data)
  };
};
export default connect(mapStateToProps, null)(AudioGraph);
