// const firebase = require('firebase');
// var admin = require("firebase-admin");
// const { Storage } = require('@google-cloud/storage');

// var serviceAccount = require("/Users/atagowani/credentials.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://studi-10484.firebaseio.com"
// });

// // Your Google Cloud Platform project ID
// const projectId = 'studi-10484';

// // Creates a client
// const storage = new Storage({
//   projectId: projectId,
// });

// const bucketName = 'studi-10484.appspot.com';
// const filename = 'images/woman_under_stress.jpg';
// const destFilename = `./storage/download.txt`;

// const options = {
//   // The path to which the file should be downloaded, e.g. "./file.txt"
//   destination: destFilename
// };

// storage
//   .bucket(bucketName)
//   .file(filename)
//   .getMetadata()
//   .then(results => {
//     const metadata = results[0];

//     console.log(`File: ${metadata.name}`);
//     console.log(`Bucket: ${metadata.bucket}`);
//     console.log(`Storage class: ${metadata.storageClass}`);
//     console.log(`Self link: ${metadata.selfLink}`);
//     console.log(`ID: ${metadata.id}`);
//     console.log(`Size: ${metadata.size}`);
//     console.log(`Updated: ${metadata.updated}`);
//     console.log(`Generation: ${metadata.generation}`);
//     console.log(`Metageneration: ${metadata.metageneration}`);
//     console.log(`Etag: ${metadata.etag}`);
//     console.log(`Owner: ${metadata.owner}`);
//     console.log(`Component count: ${metadata.component_count}`);
//     console.log(`Crc32c: ${metadata.crc32c}`);
//     console.log(`md5Hash: ${metadata.md5Hash}`);
//     console.log(`Cache-control: ${metadata.cacheControl}`);
//     console.log(`Content-type: ${metadata.contentType}`);
//     console.log(`Content-disposition: ${metadata.contentDisposition}`);
//     console.log(`Content-encoding: ${metadata.contentEncoding}`);
//     console.log(`Content-language: ${metadata.contentLanguage}`);
//     console.log(`Metadata: ${metadata.metadata}`);
//     console.log(`Media link: ${metadata.mediaLink}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

// Imports the Google Cloud client library
const {Storage} = require('@google-cloud/storage');

// Your Google Cloud Platform project ID
const projectId = 'studi-10484';

// Creates a client
const storage = new Storage({
  projectId: projectId,
});

// The name for the new bucket
const bucketName = 'my-new-bucket';

// Creates the new bucket
storage
  .createBucket(bucketName)
  .then(() => {
    console.log(`Bucket ${bucketName} created.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });