'use strict';

import JsonDB, { getDB } from './jsonDB';
import { stringToArray, getSorter, loadJsonFile, urlToId } from '../tools/functions';
import { getFilterTitleMixin } from './dbMixin';

export default async function load() {
	const sorter = getSorter('id');
	const items = (await loadJsonFile('./data/films.json'))
		.map(mapper)
		.sort(sorter);
	const db = getDB(items);
	return Object.assign({}, db, getFilterTitleMixin());
}

function mapper(item) {
	const { episode_id, producer, characters, ...data } = item;
	const obj = Object.assign({}, data, {
		id: episode_id.toString(),
		producers: stringToArray(producer),
		characters: characters.map(urlToId)
	});
	return obj;
};