const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const items = require('./routes/api/items');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const app = express();
const config = require('config');
//body parser middleware

app.use(express.json());
app.use('/api/items', items);
app.use('/api/users', users);
app.use('/api/auth', auth);
const db = config.get('mongoURI');

mongoose
	.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
	.then(() => console.log('mongoDB conectada'))
	.catch((err) => console.log(err));
//process.env
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));
