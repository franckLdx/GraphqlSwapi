'use strict';

import { getDB, urlToIdMapper } from './jsonDB';
import { getSorter, loadJsonFile } from '../tools/functions';
import { getFilterbyNameMixin } from './dbMixin';

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/starships.json'))
		.map(urlToIdMapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterbyNameMixin);
}