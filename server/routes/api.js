const routes = require('express').Router();

const event = require('./event.js');
const annotations = require('./annotations.js');

routes.use('/event', event);
routes.use('/annotations', annotations);

module.exports = routes;