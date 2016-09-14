'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray, getSorter} from '../tools/functions';

class SpeciesDB extends JsonDB {
	constructor() {
		super('./data/species.json');
	}

	load() {
		return super.load().then(()=> {
			debugger;
			const sorter = getSorter('name');
			this._items = this._items.map(specie => {
				const obj = Object.create(specie);
				obj.eye_colors = stringToArray(specie.eye_colors);
				obj.hair_colors = stringToArray(specie.hair_colors);
				obj.skin_colors = stringToArray(specie.skin_colors);
				return obj;
			}).sort(sorter);
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
