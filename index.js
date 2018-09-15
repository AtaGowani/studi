const express = require('express');
const app = express();
// const emotion = require('./lib/Emotion.js')

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/app/views/index.html');
});

app.post('/upload', (req, res) => {
  console.log('================');

  req.on('readable', function() {
    console.log(req.read());
    console.log('----');
  }); // the uploaded file object

  console.log('================');
});

app.get('/api/emotion', (req, res) => {

  res.json();
});

app.use('/node_modules', express.static('node_modules/'));

app.listen(process.env.PORT || 3000, function(){
	console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
