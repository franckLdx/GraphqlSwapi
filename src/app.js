'use strict';

import filmsDB from './data/films';
import charactersDB from './data/characters';
import speciesDB from './data/species';
import planetsDB from './data/planets';

import express from 'express';

const graphQLMiddleware = require('./graphql/api.js').getmiddelware();

export function createApp() {
	const dbs = Promise.all([
		filmsDB.load(),
		charactersDB.load(),
		speciesDB.load(),
		planetsDB.load()
	]);

	const app = express();
	app.use('/API/', graphQLMiddleware);

	return dbs.then(() => {
		return app;
	});
}
