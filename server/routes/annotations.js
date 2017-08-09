const route = require('express').Router();

const {Annotation} = require('../models/Annotation.js');

// Get Event List
route.get('/', (req, res) => {
	Annotation.find().then( (annotations) => {
		res.send( annotations );
	}, (e) => {
		if(err) {
			res.status(400).send(e);
		}
	});
});

module.exports = route;