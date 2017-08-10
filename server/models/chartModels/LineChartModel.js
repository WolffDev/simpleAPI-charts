const mongoose = require('mongoose');

let ObjectId = mongoose.Schema.Types.ObjectId;

let LineChart = mongoose.model('LineChart', {
	_id: { type: ObjectId, required: true },
	clientId: { type: String, required: true },
	clientName: { type: String, required: true },
	title: { type: String, required: true },
	subtitle: { type: String, required: false },
	xAxis: {
		categories: { type: [String], required: false },
		text: String
	},
	yAxis: {
		text: { type: String, required: false }
	},
	series: [{
		_id: false,
		name: { type: String, required: true },
		data: { type: Array, required: true, }
	}]

});

module.exports = { LineChart };