'use strict';

import JsonDB from '../db/jsonDB';
import {getSorter, stringToArray} from '../tools/functions';

class PlanetsDB extends JsonDB {
	constructor() {
		super('./data/planets.json');
	}

	load() {
		const sorter = getSorter('name');
		return super.load().then(() => {
			this._items = this._items
				.map(item => {
					const obj = Object.assign({}, item);
					for (let field of ['climate', 'terrain']) {
						obj[field] = stringToArray(item[field]);
					}
					return obj;
				}).sort(sorter);
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}

}

const planetsDB = new PlanetsDB();

export default planetsDB;
