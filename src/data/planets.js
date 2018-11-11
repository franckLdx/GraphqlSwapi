'use strict';
import JsonDB from '../db/jsonDB';
import { dbMixin } from '../db/dbMixin';
import { getSorter, stringToArray, loadJsonFile } from '../tools/functions';

const specific = (db) => ({
	findByName: (name) => {
		return db.findString(name, 'name');
	}
});


export default async function load() {
	const sorter = getSorter('name');
	const mapper = item => {
		const obj = Object.assign({}, item);
		for (let field of ['climate', 'terrain']) {
			obj[field] = stringToArray(item[field]);
		}
		return obj;
	};
	const items = (await loadJsonFile('./data/planets.json'))
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}