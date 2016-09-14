'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray} from '../db/tools';

class SpeciesDB extends JsonDB {
	constructor() {
		super('./data/species.json');
	}

	load() {
		return super.load().then(()=> {
			this._items = this._items.map(specie => {
				const obj = Object.create(specie);
				obj.eye_colors = stringToArray(specie.eye_colors);
				obj.hair_colors = stringToArray(specie.hair_colors);
				obj.skin_colors = stringToArray(specie.skin_colors);
				return obj;
			}).sort((specie1, specie2) => specie1.name < specie2.name ? -1 : 1);
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}
}

const speciesDB = new SpeciesDB();
export default speciesDB;
