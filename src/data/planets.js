'use strict';

import JsonDB from '../db/jsonDB';
import { getSorter, stringToArray, loadJsonFile } from '../tools/functions';

class PlanetsDB {

	async load() {
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
		this._db = new JsonDB(items);
		return this;
	}

	findByName(name) {
		return this.findString(name, 'name');
	}

}

const planetsDB = new PlanetsDB();

export default planetsDB;
