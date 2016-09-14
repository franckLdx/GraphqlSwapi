'use strict';

import filmsDB from './data/films';
import charactersDB from './data/characters';
import speciesDB from './data/species';
import planetsDB from './data/planets';
import starshipsDB from './data/starships';
import vehiclesDB from './data/vehicles';

import express from 'express';

const graphQLMiddleware = require('./graphql/api.js').getmiddelware();

export function createApp() {
	const dbs = Promise.all([
		filmsDB.load(),
		charactersDB.load(),
		speciesDB.load(),
		planetsDB.load(),
		starshipsDB.load(),
		vehiclesDB.load()
	]);

	const app = express();
	app.use('/API/', graphQLMiddleware);

	return dbs.then(() => {
		return app;
	});
}
