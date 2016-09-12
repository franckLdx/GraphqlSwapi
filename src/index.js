'use strict';

import bunyan from 'bunyan';
import http from 'http';
import { createApp } from './app.js';

const logger = bunyan.createLogger({name: "Graphql-Swapi"});

logger.info('Server initialisation...');
createApp()
	.then((app) => {
		logger.info('Starting HTTP server');
		const server = http.createServer(app);
		server.listen(8000, ()=> { logger.info('Server is up and running'); });
	})
	.catch((err) => { logger.error(err); });
