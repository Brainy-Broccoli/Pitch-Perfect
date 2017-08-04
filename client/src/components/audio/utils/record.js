import detectPitch from './detectPitch';

const record = (callback) => 

  navigator.mediaDevices.getUserMedia({audio: true})
    .then( stream => {

      const mediaRecorder = new MediaRecorder(stream);
      const buffer = [];

      mediaRecorder.start();

      mediaRecorder.ondataavailable = (e) => {
        buffer.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(buffer, { 'type': 'audio/ogg; codecs=opus' });
        detectPitch(blob)
          .then( data => {
            stream.getTracks().forEach(track => { track.stop(); });
            callback({blob, data});
          });
      };

      return mediaRecorder;

    });

export default record;