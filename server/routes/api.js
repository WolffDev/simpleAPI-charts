const route = require('express').Router();

const chart = require('./chart/chart.js');

route.use('/chart', chart);

module.exports = route;