'use strict';

import bunyan from 'bunyan';
import http from 'http';
import { createApp } from './app.js';
import eventsToAnyPromise from 'events-to-any-promise';

const logger = bunyan.createLogger({name: "Graphql-Swapi"});

function startServer(port, app) {
	logger.info('Starting HTTP server');
	const server = http.createServer(app);
	server.listen(port);
	return eventsToAnyPromise(server, 'listening').then(() => {
		logger.info('Server is up and running');
		return server;
	});
}

logger.info('Server initialisation...');
createApp()
	.then((app) => startServer(8000, app))
	.catch((err) => { logger.error(err); });
