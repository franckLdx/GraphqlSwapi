'use strict';

import loadfilmsDB from './data/films';
import loadCharactersDB from './data/characters';
import loadPanetsDB from './data/planets';
import loadSpeciesDB from './data/species';
import starshipsDB from './data/starships';
import vehiclesDB from './data/vehicles';

import express from 'express';

const { getMiddelware } = require('./graphql/api.js');

export async function createApp() {
	const app = express();

	const [
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB
	] = await Promise.all([
		loadfilmsDB(),
		loadCharactersDB(),
		loadPanetsDB(),
		loadSpeciesDB(),
		// starshipsDB.load(),
		// vehiclesDB.load()
	]);

	const context = {
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB,
	};

	app.use('/API/', getMiddelware(context));

	return app;
}
