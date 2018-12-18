'use strict';

import { getDB } from './jsonDB';
import { getSorter, loadJsonFile, urlToId } from '../tools/functions';
import { getFilterbyNameMixin } from './dbMixin';

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/starships.json'))
		.map(mapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterbyNameMixin());
}


function mapper(item) {
	const {
		url,
		films,
		pilots,
		...data
	} = item;
	const obj = Object.assign({}, data, {
		id: urlToId(url),
		films: films.map(urlToId),
		pilots: pilots.map(urlToId),
	});
	return obj;
};