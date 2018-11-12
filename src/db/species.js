'use strict';

import JsonDB from './jsonDB';
import { stringToArray, getSorter, loadJsonFile } from '../tools/functions';
import { dbMixin } from './dbMixin';

const specific = (db) => ({
	findByName: (name) => {
		return db.findString(name, 'name');
	},
	findByClassification: (classification) => {
		return db.findString(classification, 'classification');
	},
	findByDesignation: (designation) => {
		return db.findString(designation, 'designation');
	},
});

const mapper = item => {
	const obj = Object.assign({}, item);
	for (let attr of ['eye_colors', 'hair_colors', 'skin_colors']) {
		obj[attr] = stringToArray(item[attr]);
	}
	if (item.classification === 'mammals') {
		obj.classification = 'mammal';
	}
	return obj;
};

export default async function load() {
	const sorter = getSorter('name');
	const items = (await loadJsonFile('./data/species.json'))
		.map(mapper)
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}