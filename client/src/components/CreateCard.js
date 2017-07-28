import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Image, Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';

class CreateCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      englishWord: '',
      tone: '',
      chineseChar: '',
      pinyin: '',
      recording: false,
      recordedSound: null
    };

    this.record = this.record.bind(this);
    this.stopRecording = this.stopRecording.bind(this);

    this.audioCtx = new AudioContext();
    this.stream = null;
    this.buffer = null;
    this.analyser = null;

    this.recordedAudioData = [];


    this.source = null;
    this.readyToPlay = false;
    this.source = this.audioCtx.createBufferSource();
    this.recordingBuffer = null;

    this.playUserVoice = this.playUserVoice.bind(this);
  }

  handleEnglishWord(event) {
    this.setState({
      englishWord: event.target.value
    })
  }

  handleTone(event) {
    this.setState({
      tone: event.target.value
    })
  }

  handleChineseChar(event) {
    this.setState({
      chineseChar: event.target.value
    })
  }

  handlePinYin(event) {
    this.setState({
      pinyin: event.target.value
    })
  }

  createNewCard() {
    let options = {
      translation: this.state.englishWord,
      character: this.state.chineseChar,
      tone: this.state.tone,
      pinyin: this.state.pinyin,
      IPA: this.state.pinyin,
      female_voice: this.state.recordedSound
    }
    fetch('/api/create-card', {
      headers: {
        'Accept': 'application/json',
        'Content-Type:': 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(options)
    })
    .then(res => res.json())
    .then((data) => {
      console.log('RECEIVED DATA FOR NEW CARD', data);
    })
  }

  playUserVoice() {
    if (this.readyToPlay) {
      this.source = this.audioCtx.createBufferSource();
      this.source.buffer = this.recordingBuffer;
      this.source.connect(this.audioCtx.destination);
      this.source.start(0);
    }
  }


  record() {
    if (!this.state.recording) {
      navigator.mediaDevices.getUserMedia({audio: true})
        .then( stream => {
          this.stream = stream;
          this.recordedPitchData = [];
          this.setState({
            recording: true
          });

          const recordingNode = this.audioCtx.createMediaStreamSource(stream);
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.start();
          this.mediaRecorder.ondataavailable = (e) => {
            this.recordedAudioData.push(e.data);
          }
          this.mediaRecorder.onstop = (e) => {

            var blob = new Blob(this.recordedAudioData, {'type': 'audio/ogg; codecs=opus'});

            this.setState({
              recordedSound: blob
            });

            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(blob);


            fileReader.onloadend = () => {
              const arrayBuffer = fileReader.result;

              this.audioCtx.decodeAudioData(arrayBuffer, (buffer) => {
                this.recordingBuffer = buffer;
                this.readyToPlay = true;
              })
            }

            this.recordedAudioData = [];
          }
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 1024;
          this.buffer = new Float32Array(this.analyser.fftSize);
          recordingNode.connect(this.analyser);

          //UNCOMMENT THIS LINE TO FORWARD AUDIO TO OUTPUT
          //================================================
          //
          //this.analyser.connect(this.audioCtx.destination)


          setTimeout(this.stopRecording, 750);
      })
      .catch( err => {
        console.error('Oops something broke ', err);
      });
    } 
  }

  stopRecording() {
    if(this.state.recording) {
      this.mediaRecorder.stop();
      this.stream.getTracks().forEach(track => {track.stop()});
      this.setState({
        recording: false
      });
    }
  }

  render() {
    return (
      <Grid padded stretched={true}>
        <Grid.Row >
          <Grid.Column width={8}>
            <Input placeholder='English Word (20 Characters)' value={this.state.englishWord} onChange={(event) => this.handleEnglishWord(event)}/>
            <Input placeholder='Tone (Number)' value={this.state.tone} onChange={(event) => this.handleTone(event)} style={{marginTop: 5}}/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Input placeholder='Chinese Character (20 Characters)' value={this.state.chineseChar} onChange={(event) => this.handleChineseChar(event)} />
            <Input placeholder='Pinyin (20 Characters)' value={this.state.pinyin} onChange={(event) => this.handlePinYin(event)} style={{marginTop: 5}}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            { this.state.recording
              ? <Button circular icon='stop' color='red' size='big' onClick={this.stopRecording} />
              : <Button circular icon='unmute' color='red' size='big' onClick={this.record} />
            }
            <Button circular basic icon='repeat' size='big' style={{marginTop: `0.5em`}} onClick={this.playUserVoice} />
            {
              this.state.recordedSound 
                && this.state.englishWord 
                && this.state.tone 
                && this.state.chineseChar
                && this.state.pinyin ? 
                <Button onClick={() => this.createNewCard()} style={{marginTop: `2em`}}>
                  Create Card!
                </Button>
              : null
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
};

const mapStateToProps = (state) => {
  // Whatever is returned will show up as props 
  return {
    allDecks: state.practicePage.allDecks
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ selectDeck, loadPracticePage, loadProfile }, dispatch);
  // return {
  //   onDeckSelect: (deckIndex) => {
  //     dispatch(selectDeck(deckIndex));
  //   }
  // };
};

// export default connect(mapStateToProps,mapDispatchToProps)(DecksContainer);

export default CreateCard;

