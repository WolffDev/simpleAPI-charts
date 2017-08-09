const route = require('express').Router();

const { LineChart } = require('../../models/chartModels/LineChartModel.js');

// Get Event List
route.get('/', (req, res) => {
	res.send("YAYA");
});

module.exports = route;