const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const items = require('./routes/api/items');

const app = express();

//body parser middleware

app.use(bodyParser.json());
app.use('/api/items', items);
const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => console.log('mongoDB conectada'))
	.catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('../client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
