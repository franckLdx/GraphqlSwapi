'use strict';

import JsonDB from '../db/jsonDB';
import { stringToArray, getSorter, loadJsonFile } from '../tools/functions';
import { dbMixin } from '../db/dbMixin';

const specific = (db) => ({

	findById: (id) => {
		return db.findOne(film => film.id === id);
	},

	findByTitle: (title) => {
		return db.findString(title, 'title');
	},
});

export default async function load() {
	const sorter = getSorter('id');
	const mapper = item => {
		const obj = Object.assign({}, item, {
			id: item.episode_id,
			producers: stringToArray(item.producer),
		});
		delete obj.episode_id;
		delete obj.producer;
		return obj;
	};
	const items = (await loadJsonFile('./data/films.json'))
		.map(mapper)
		.sort(sorter);
	const db = new JsonDB(items);
	return dbMixin(specific(db), db);
}
