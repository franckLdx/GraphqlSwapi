'use strict';

import filmDB from './data/films';

import express from 'express';

const graphQLMiddleware = require('./graphql/api.js').getmiddelware();

export function createApp() {
	const dbs = Promise.all([filmDB.load()]);

	const app = express();
	app.use('/API/', graphQLMiddleware);

	return dbs.then(() => {
		return app;
	});
}
