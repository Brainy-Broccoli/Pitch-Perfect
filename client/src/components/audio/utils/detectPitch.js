import * as Pitchfinder from 'pitchfinder';

export const detectPitch = (blob, ctx) => 

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
          const detection = [Pitchfinder.YIN(), Pitchfinder.AMDF()]; 

          const config = {
            tempo: 1200,
            quantization: 8,
          };

          const frequencies = Pitchfinder.frequencies(detection, data, config); 
          resolve(frequencies);

        });
      };

      fileReader.readAsArrayBuffer(blob);

  };
