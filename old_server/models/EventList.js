const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let EventList = mongoose.model('EventList', {
	_id: {
		type: ObjectId,
		required: true
	},
	creatorName: {
		type: String,
		required: true
	},
	eventImage: {
		type: String,
		required: true
	},
	eventTitle: {
		type: String,
		required: true
	},
	eventDate: {
		type: String,
		required: true
	}
});

module.exports = {EventList};