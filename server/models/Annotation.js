const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let Annotation = mongoose.model('Annotation', {
	_id: {
		type: ObjectId,
		required: true
	},
	latitude: {
		type: Number,
		required: true
	},
	longitude: {
		type: Number,
		required: true
	},
	image: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	creator: {
		type: String,
		required: true
	}
});

module.exports = {Annotation};