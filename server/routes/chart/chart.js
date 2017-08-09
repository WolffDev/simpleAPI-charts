const route = require('express').Router();

const lineChart = require('./lineChart.js');

// Get Event List
route.use('/lineChart', lineChart);

module.exports = route;