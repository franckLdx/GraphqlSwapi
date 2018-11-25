'use strict';

import {
	loadFilmsDB,
	loadCharactersDB,
	loadPlanetsDB,
	loadSpeciesDB,
	loadStarshipsDB,
	loadVehiclesDB,
} from './db'

import express from 'express';
import cors from 'cors';

const { getMiddelware } = require('./graphql');

export async function createApp() {
	const app = express();

	const [
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB,
		starshipsDB,
		vehiclesDB
	] = await Promise.all([
		loadFilmsDB(),
		loadCharactersDB(),
		loadPlanetsDB(),
		loadSpeciesDB(),
		loadStarshipsDB(),
		loadVehiclesDB()
	]);

	const context = {
		filmsDB,
		charactersDB,
		planetsDB,
		speciesDB,
		starshipsDB,
		vehiclesDB
	};

	app.use(cors());
	app.use('/API/', getMiddelware(context));

	return app;
}
