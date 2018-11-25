'use strict';

import { getDB } from './jsonDB';
import { getSorter, urlToId, stringToArray, loadJsonFile } from '../tools/functions';
import { getFilterbyNameMixin } from './dbMixin'

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/planets.json'))
		.map(mapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterbyNameMixin());
}

function mapper(item) {
	const { url, climate, terrain, ...data } = item;
	return Object.assign(
		{},
		data,
		{
			id: urlToId(url),
			climate: stringToArray(climate),
			terrain: stringToArray(terrain)
		},
	);
};