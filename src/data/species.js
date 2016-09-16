'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray, getSorter} from '../tools/functions';

class SpeciesDB extends JsonDB {
	constructor() {
		super('./data/species.json');
	}

	load() {
		return super.load().then(()=> {
			const sorter = getSorter('name');
			this._items = this._items.map(specie => {
				const obj = Object.assign({}, specie);
				for (let item of ['eye_colors', 'hair_colors', 'skin_colors']) {
					obj[item] = stringToArray(specie[item]);
				}
				if (specie.classification==='mammals') {
					obj.classification='mammal';
				}
				return obj;
			}).sort(sorter);
			debugger;
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
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
