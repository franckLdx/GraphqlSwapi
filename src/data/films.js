'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray, getSorter} from '../tools/functions';

class FilmDB extends JsonDB {
	constructor() {
		super('./data/films.json');
	}

	load() {
		return super.load().then(() => {
			const sorter = getSorter('id');
			this._items = this._items
				.map(item => {
					const obj = Object.assign({}, item);
					obj.id = item.episode_id;
					delete obj.episode_id;
					obj.producers = stringToArray(item.producer);
					delete obj.producer;
					return obj;
				}).sort(sorter);
			return this;
		});
	}

	findById(id) {
		return this.findOne(film => film.id===id);
	}

	findByTitle(title) {
		return this.findString(title, 'title');
	}
}

const filmDB = new FilmDB();

export default filmDB;
