'use strict';

import { getDB } from './jsonDB';
import { getSorter, loadJsonFile } from '../tools/functions';
import { getFilterbyNameMixin } from './dbMixin';

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/vehicles.json'))
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterbyNameMixin());
}
