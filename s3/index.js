// first create the S3 instance and configure it 
const AWS = require('aws-sdk');
const fs = require('fs');
const S3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: '',
  region: 'us-west-1',
  maxRetries: 10,
  apiVersion: 'latest'
});

const createParams = (recordingName, soundBlob) => ({
  ACL: 'public-read',
  Bucket: 'pitch-perfect-thesis',
  Key: `user-generated-sounds/${recordingName}`,
  Body: soundBlob,
  ContentType: 'audio/ogg'
});
// ContentType for the actual audiofiles will be audio/ogg
// let binData = fs.readFileSync('apple-pingguo.ogg');
// console.log(binData);

// S3.upload(createParams('sample-recording.ogg', binData), (err, data) => {
//   if (err) {
//     console.log('error occurred uploading', err);
//   } else {
//     console.log('data returned from upload', data);
//     const url = data.Location;
//   }
// });


module.exports = {
  S3,
  createParams
};
