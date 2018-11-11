'use strict';

import loadfilmsDB from './data/films';
import loadCharactersDB from './data/characters';
import loadPanetsDB from './data/planets';
import loadSpeciesDB from './data/species';
import loadStarshipsDB from './data/starships';
import vehiclesDB from './data/vehicles';

import express from 'express';

const { getMiddelware } = require('./graphql/api.js');

export async function createApp() {
	const app = express();

	const [
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB,
		starshipsDB
	] = await Promise.all([
		loadfilmsDB(),
		loadCharactersDB(),
		loadPanetsDB(),
		loadSpeciesDB(),
		loadStarshipsDB(),
		// vehiclesDB.load()
	]);

	const context = {
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB,
		starshipsDB
	};

	app.use('/API/', getMiddelware(context));

	return app;
}
