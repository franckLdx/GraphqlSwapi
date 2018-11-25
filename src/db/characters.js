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
	const { url, ...data } = item;
	const obj = Object.assign({}, data, {
		id: urlToId(url),
	});
	return obj;
};