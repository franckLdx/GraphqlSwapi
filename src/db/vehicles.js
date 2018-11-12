'use strict';

import JsonDB from './jsonDB';
import { getSorter, loadJsonFile } from '../tools/functions';
import { dbMixin } from './dbMixin';

const specific = (db) => ({
	findByName(name) {
		return db.findString(name, 'name');
	}
});

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/vehicles.json'))
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}
