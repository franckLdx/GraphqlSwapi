'use strict';

import JsonDB from '../db/jsonDB';
import { stringToArray, getSorter, loadJsonFile } from '../tools/functions';

class SpeciesDB {

	async load() {
		const sorter = getSorter('name');
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
		const items = (await loadJsonFile('./data/planets.json'))
			.map(mapper)
			.sort(sorter);
		this._db = new JsonDB(items);
		return this;
	}

	findByName(name) {
		return this._db.findString(name, 'name');
	}

	findByClassification(classification) {
		return this.findString(classification, 'classification');
	}

	findByDesignation(designation) {
		return this.findString(designation, 'designation');
	}
}

const speciesDB = new SpeciesDB();
export default speciesDB;
