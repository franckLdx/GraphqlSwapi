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
					obj.producers = stringToArray(item.producer);
					return obj;
				});
			return this;
		});
	}

	findByid(id) {
		return this._items.find(film => film.episode_id===id);
	}

	findByTitle(title) {
		const searched = title.toLowerCase();
		return this._items.filter(film => film.title.toLowerCase().indexOf(searched)!==-1);
	}
}

const filmDB = new FilmDB();

export default filmDB;
