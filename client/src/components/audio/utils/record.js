const record = (ctx, callback) => 

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
        const fileReader = new FileReader();

        fileReader.readAsArrayBuffer(blob);

        fileReader.onloadend = () => {
          const audioBuffer = fileReader.result; 
          ctx.decodeAudioData(audioBuffer, callback);
        };
      };

      return mediaRecorder;

    });
