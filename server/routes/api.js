const routes = require('express').Router();

const event = require('./event.js');

// const eventList = require('./eventList.js');
const annotations = require('./annotations.js');

routes.use('/event', event);
// routes.use('/eventlist', eventList);
routes.use('/annotations', annotations);

module.exports = routes;