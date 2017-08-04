import Pitchfinder from 'pitchfinder';

const detectPitch = (blob, ctx) => 

  new Promise( (resolve, reject) => {

    if (!ctx) {
      ctx = new AudioContext();
    }

    const fileReader = new FileReader();

    fileReader.onloadend = () => {

      const audioBuffer = fileReader.result; 

      ctx.decodeAudioData(audioBuffer)
        .then( audioData => {

          const data = audioData.getChannelData(0);
          const detection = new Pitchfinder.AMDF(); 

          const config = {
            tempo: 1200,
            quantization: 8,
          };

          const frequencies = Pitchfinder.frequencies(detection, data, config); 

          const frequenciesWithTimeData = frequencies.map( (freq, idx) => ({
            freq: freq,
            time: ( idx / ( (config.tempo / 60) * config.quantization) ),
          }));
          ctx.close();
          resolve(frequenciesWithTimeData);

        })
        .catch( err => {
          reject(err);
        });
    };

    fileReader.readAsArrayBuffer(blob);
 
  });

export default detectPitch;
