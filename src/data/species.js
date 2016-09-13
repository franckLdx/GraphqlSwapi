'use strict';

import JsonDB from '../db/jsonDB';
import {stringToArray} from '../db/tools';

class SpeciesDB extends JsonDB {
	constructor() {
		super('./data/species.json');
	}

	load() {
		return super.load(specie => {
			const obj = Object.create(specie);
			obj.eye_colors = stringToArray(specie.eye_colors);
			obj.hair_colors = stringToArray(specie.hair_colors);
			obj.skin_colors = stringToArray(specie.skin_colors);
			return obj;
		})
	}
};

export default new SpeciesDB;
