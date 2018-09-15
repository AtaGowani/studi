const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/app/views/index.html');
});

app.use('/node_modules', express.static('node_modules/'));

app.listen(process.env.PORT || 3000, function(){
	console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
