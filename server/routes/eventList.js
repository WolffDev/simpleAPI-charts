const route = require('express').Router();

const {EventList} = require('../models/EventList.js');

// Get Event List
route.get('/', (req, res) => {
	EventList.find().then( (eventList) => {
		res.send( eventList );
	}, (e) => {
		if(err) {
			res.status(400).send(e);
		}
	});
});

module.exports = route;