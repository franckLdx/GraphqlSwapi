'use strict';

import { getDB } from './jsonDB';
import { stringToArray, getSorter, urlToId, loadJsonFile } from '../tools/functions';
import {
	getFilterbyNameMixin,
	getFilterbyClassificationMixin,
	getFilterbyDesignationMixin
} from './dbMixin';

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/species.json'))
		.map(mapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign(
		{},
		db,
		getFilterbyNameMixin(),
		getFilterbyClassificationMixin(),
		getFilterbyDesignationMixin(),
	);
};

import bunyan from 'bunyan';
const logger = bunyan.createLogger({ name: "Graphql-Swapi" });

function mapper(item) {
	const {
		url,
		classification,
		eye_colors,
		hair_colors,
		skin_colors,
		homeworld,
		people,
		films,
		...data
	} = item;
	const obj = Object.assign({}, data, {
		id: urlToId(url),
		eye_colors: stringToArray(eye_colors),
		hair_colors: stringToArray(hair_colors),
		skin_colors: stringToArray(skin_colors),
		classification: classification === 'mammals' ? 'mammal' : classification,
		homeworld: urlToId(homeworld),
		characters: people.map(urlToId),
		films: films.map(urlToId),
	});
	return obj;
};