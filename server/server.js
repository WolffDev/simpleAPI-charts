const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
// const {Todo} = require('./models/Todo.js');
// const {User} = require('./models/User.js');

const api = require('./routes/api.js');

// const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 4444;

app.use(bodyParser.json());

app.use('/api', api);



app.listen(port, () => {
	console.log(`Started up at port http://localhost:${port}`);
});

module.exports = {app};