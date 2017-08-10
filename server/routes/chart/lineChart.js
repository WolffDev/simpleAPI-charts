const route = require('express').Router();
const { ObjectId } = require('mongodb');

const { LineChart } = require('../../models/chartModels/LineChartModel.js');

// Get Event List
route.get('/', (req, res) => {
	LineChart.find().then( (lineChart) => {
		res.send(lineChart);
	}, (e) => {
		res.status(400).send(e);
	});
});

route.get('/:id', (req, res) => {

	let id = req.params.id;
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	LineChart.findById(id).then( (event) => {
		if(!event) { 
			res.status(404).send('Invalid ID');
		}
		
		res.send( event );
	}).catch( (e) => {
		res.status(404).send(e);
	});
});

route.post('/', (req, res) => {

	let objId = new ObjectId();

	let lineChart = new LineChart({
		_id: objId,
		clientId: req.body.clientId,
		clientName: req.body.clientName,
		title: req.body.title,
		subtitle: req.body.subtitle,
		xAxis: {
			categories: req.body.xAxis.categories,
			text: req.body.xAxis.text
		},
		yAxis: {
			text: req.body.yAxis.text
		},
		series: req.body.series
	});

	lineChart.save().then( (doc) => {
		res.status(200)
			.send(doc);
	}, (e) => {
		res.status(400)
			.send(e);
	});

});




module.exports = route;