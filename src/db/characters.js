'use strict';

import { getDB } from './jsonDB';
import { getSorter, urlToId, loadJsonFile } from '../tools/functions';
import { getFilterbyNameMixin } from './dbMixin';

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/people.json'))
		.map(mapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterbyNameMixin());
}

function mapper(item) {
	const {
		url,
		homeworld,
		films,
		species,
		vehicles,
		starships,
		...data
	} = item;

	const obj = Object.assign({}, data, {
		id: urlToId(url),
		homeworld: urlToId(homeworld),
		films: films.map(urlToId),
		species: species.map(urlToId),
		vehicles: vehicles.map(urlToId),
		starships: starships.map(urlToId),
	});

	return obj;
};