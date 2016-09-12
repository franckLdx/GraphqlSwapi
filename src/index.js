'use strict';

import bunyan from 'bunyan';
import http from 'http';
import { app } from './app.js';

const logger = bunyan.createLogger({name: "Graphql-Swapi"});

const server = http.createServer(app);
server.listen(8000, ()=> { logger.info('Server is up and running'); });
