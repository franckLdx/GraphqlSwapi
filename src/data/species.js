'use strict';

import JsonDB from '../db/jsonDB';

class SpeciesDB extends JsonDB {
	constructor() {
		super('../../data/species.json');
	}

	/*load() {
		super.load().then(() => {
			this._items = this._items
				.sort(({name1}, {name2}) => name1 < name2 ? -1 : 1))
				.map(item=> {
					const obj = Object.create(item);
					obj.eye_colors = stringToArray(item.eye_colors);
					obj.hair_colors = stringToArray(item.hair_colors);
					obj.skin_colors = stringToArray(item.skin_colors);
				});
			return this;
		});
	}*/
};

export default new SpeciesDB;
