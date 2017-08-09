const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let DetailSchema = mongoose.model('DetailSchema', {
	title: {
		type: String,
		required: true
	},
	street: {
		type: String,
		required: true
	},
	zipcode: {
		type: String,
		required: true
	},
	city: {
		type: String,
		required: true
	},
	desc: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true
	}
});

let ParticipantSchema = mongoose.model('ParticipantSchema', {
	userId: {
		type: String,
		required: true
	},
	userImage: {
		type: String,
		required: true
	}
});

let Event = mongoose.model('Event', {
	_id: {
		type: ObjectId,
		required: true
	},
	creatorId: {
		type: String,
		required: true
	},
	creatorName: {
		type: String,
		required: true
	},
	createDate: {
		type: Date,
		default: Date.now
	},
	eventDate: {
		type: String
	},
	longitude: {
		type: String,
		required: true
	},
	latitude: {
		type: String,
		required: true
	},
	details: {
		type: {DetailSchema},
		required: true
	},
	// participants: {
	// 	type: {ParticipantSchema}
	// 	// http://stackoverflow.com/questions/19695058/how-to-define-object-in-array-in-mongoose-schema-correctly-with-2d-geo-index
	// }
});

module.exports = {Event};