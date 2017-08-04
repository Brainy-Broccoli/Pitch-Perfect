const Promise = require('bluebird');
const fs = require('fs');
const axios = require('axios');
Promise.promisifyAll(fs);
const WavDecoder = require('wav-decoder');
const Pitchfinder = require('pitchfinder');
const regression = require('regression');

const amdfDetector = new Pitchfinder.AMDF();

const detectionConfig = {
  tempo: 1200,
  quantization: 8
};


fs.readdirAsync('./word-recordings')
  .then(files => {
    console.log('files', files);
    files.forEach(file => {
      if (file !== '.DS_Store') {
        fs.readFileAsync(`./word-recordings/${file}`)
          .then(buffer => {
            return WavDecoder.decode(buffer);
          })
          .then(audioData => {
            const float32Array = audioData.channelData[0];
            const frequencies = Pitchfinder.frequencies(amdfDetector, float32Array, detectionConfig);
            const deltaT = 1 / ((detectionConfig.tempo / 60) * detectionConfig.quantization);
            const coords = frequencies.map((currFrequency, index) => {
              return {
                time: index * deltaT,
                freq: currFrequency
              };
            });
            const regressMe = coords.filter(a=>a.freq).map(datum => [datum.time, datum.freq]);
            const reg = regression.polynomial(regressMe, { order: 3, precision: 4 });
            const coefficients = (reg.equation);
            const calc = x => (coefficients.reduce( (acc, co, i) => acc += (co * Math.pow(x, coefficients.length - (i + 1))), 0));
            //console.log(regressMe);
            //console.log('arr of coeffs', coefficients);
            //console.log(reg.string);
            // now to send the put request
            let endIndex = file.indexOf('-');
            let cardID = file.substring(0, endIndex);
            console.log('For file', file, 'with card id', cardID, 'we have coeffs', coefficients, 'and this many coords', coords.length);
            axios.put(`http://localhost:3000/api/card/${cardID}/soundData`, {
              soundData: coords,
              regression: coefficients,
            })
              .then(res => console.log(res))
              .catch(err => console.log('err sending post request', err));
          })
          .catch(err => console.log('likely error reading file', err));
      }
    });
  })
  .catch(err => console.log('err occurred getting files from directory'));
  
