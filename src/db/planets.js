'use strict';
import JsonDB from './jsonDB';
import { dbMixin } from './dbMixin';
import { getSorter, stringToArray, loadJsonFile } from '../tools/functions';
import bunyan from 'bunyan';

const specific = (db) => ({
	findByName: (name) => {
		return db.findString(name, 'name');
	}
});

const mapper = item => {
	return Object.assign(
		{},
		item,
		{
			climate: stringToArray(item.climate),
			terrain: stringToArray(item.terrain)
		}
	);
};

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/planets.json'))
		.map(mapper)
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}