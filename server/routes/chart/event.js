const route = require('express').Router();
const {ObjectId} = require('mongodb');

const {Event} = require('../../models/chartModels/Event.js');
const {Annotation} = require('../../models/chartModels/Annotation.js');
const {EventList} = require('../../models/chartModels/EventList.js');

// Add Event
route.post('/', (req, res) => {

	let objId = new ObjectId();

	let event = new Event({
		_id: objId,
		creatorId: req.body.creatorId,
		creatorName: req.body.creatorName,
		createDate: req.body.createDate,
		eventDate: req.body.eventDate,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		details: req.body.details
	});

	let annotation = new Annotation({
		_id: objId,
		latitude: req.body.latitude,
		longitude: req.body.longitude,
		image: req.body.details.image,
		title: req.body.details.title,
		creator: req.body.creatorName
	});

	let eventList = new EventList({
		_id: objId,
		creatorName: req.body.creatorName,
		eventImage: req.body.details.image,
		eventTitle: req.body.details.title,
		eventDate: req.body.eventDate
	});

	event.save().then( (doc) => {
		annotation.save();
		eventList.save();
		res.send(doc)
	}, (e) => {
		res.status(400).send(e)
	});
});

// Get All Events
route.get('/', (req, res) => {
	EventList.find().then( (eventlist) => {
		res.send( eventlist );
	}, (e) => {
		if(err) {
			res.status(400).send(e);
		}
	});
});

// Get Single Event

route.get('/:id', (req, res) => {
	let id = req.params.id

	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	Event.findById(id).then( (event) => {
		if(!event) {
			return res.status(404).send("Invalid ID");
		}

		res.send( event );
	}).catch( (e) => {
		res.status(400).send(e);
	})
});

// Delete Singe Event
route.delete('/:id', (req, res) => {
	let id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send("Invalid ID");
	}

	Event.findByIdAndRemove(id).then( (event) => {
		if(!event) {
			return res.status(404).send("ID does not exist");
		}
		Annotation.findByIdAndRemove(id).remove().exec();
		EventList.findByIdAndRemove(id).remove().exec();
		res.send(event);
	}).catch( (e) => {
		res.status(400).send();
	});
});

// Update single Event
route.put('/:id', (req, res) => {
	let id = req.params.id;
	let body = {
		creatorName: req.body.creatorName,
		creatorId: req.body.creatorId,
		createDate: req.body.createDate,
		eventDate: req.body.eventDate,
		longitude: req.body.longitude,
		latitude: req.body.latitude,
		details: req.body.details,
		participants: req.body.participants
	};

	Event.findByIdAndUpdate(id, {$set: body}, {new: true}).then( (event) => {
		if(!event) {
			res.status(404).send();
		}

		res.send( {event} );
	}).catch( (e) => {
		res.status(400).send(e);
	})
});

module.exports = route;