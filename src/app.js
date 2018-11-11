'use strict';

import loadfilmsDB from './data/films';
import loadCharactersDB from './data/characters';
import speciesDB from './data/species';
import planetsDB from './data/planets';
import starshipsDB from './data/starships';
import vehiclesDB from './data/vehicles';

import express from 'express';

const { getMiddelware } = require('./graphql/api.js');

export async function createApp() {
	const app = express();

	const [
		filmsDB,
		charactersDB
	] = await Promise.all([
		loadfilmsDB(),
		loadCharactersDB(),
		// speciesDB.load(),
		// planetsDB.load(),
		// starshipsDB.load(),
		// vehiclesDB.load()
	]);

	const context = {
		filmsDB,
		charactersDB,
	};

	app.use('/API/', getMiddelware(context));

	return app;
}
