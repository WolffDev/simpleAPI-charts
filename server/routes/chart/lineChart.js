const route = require('express').Router();
const { ObjectId } = require('mongodb');

const { LineChart } = require('../../models/chartModels/LineChartModel.js');

// Get sll LineCharts
route.get('/', (req, res) => {
	LineChart.find().then( (lineChart) => {
		res.send(lineChart);
	}, (e) => {
		res.status(400).send(e);
	});
});

// Get single LineChart, depending on the ID
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

// Create new LineChart - returns with the new linechart that was created as responds
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
		res.status(201)
			.send(doc);
	}, (e) => {
		res.status(400)
			.send(e);
	});

});

// Update an existing linechart, from ID.
// Using PUT endpoint, so all the data has to be send to the API, otherwise the field will be empty.
// Responds with the new data that has been updated
// PUT vs PATCH
// https://stackoverflow.com/questions/28459418/rest-api-put-vs-patch-with-real-life-examples
route.put('/:id', (req, res) => {

	let id = req.params.id;
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}

	let body = {
		_id: id,
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
	};

	LineChart.findByIdAndUpdate(id, { $set: body }, { new: true }).then( (event) => {
		if(!event) res.status(404).send("Invalid ID");

		res.send(event);
	}).catch( e => res.status(400).send(e) );

});

// Delete a linechart with the giving ID
route.delete('/:id', (req, res) => {

	let id = req.params.id;

	if(!ObjectId.isValid(id)) {
		return res.status(404).send("Invalid ID");
	}

	LineChart.findByIdAndRemove(id).then( (event) => {
		if(!event) {
			return res.status.status(404).send("ID does not exist");
		}

		res.send(event);
	}).catch( (e) => {
		res.status(400).send(e);
	});
});




module.exports = route;