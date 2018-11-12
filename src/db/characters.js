'use strict';

import JsonDB from './jsonDB';
import { dbMixin } from './dbMixin';
import { getSorter, loadJsonFile } from '../tools/functions';

const specific = (db) => ({
	findByName: (name) => {
		return db.findString(name, 'name');
	}
});

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/people.json'))
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}