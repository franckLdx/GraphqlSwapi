'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray} from '../db/tools';

class FilmDB extends JsonDB {
	constructor() {
		super('./data/films.json');
	}

	load() {
		return super.load().then(() => {
			this._items = this._items
				.sort((film1, film2) => film1.episode_id < film2.episode_id ? -1 : 1)
				.map(item => {
					const obj = Object.assign({}, item);
					obj.id = item.episode_id;
					delete obj.episode_id;
					obj.producers = stringToArray(item.producer);
					delete obj.producer;
					return obj;
				});
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
