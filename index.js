const express = require('express');
const ParseServer = require('parse-server').ParseServer;
const app = express();

const server = new ParseServer({
  databaseURI: 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: './cloud/main.js', // Path to your Cloud Code
  appId: '1',
  masterKey: '1', // Keep this key secret!
  fileKey: 'optionalFileKey',
  serverURL: 'http://localhost:1337/parse' // Don't forget to change to https if needed
});

// Start server
server.start();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', server.app);

app.listen(1337, function() {
  console.log('parse-server-example running on port 1337.');
});