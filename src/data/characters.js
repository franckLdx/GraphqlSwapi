'use strict';

import JsonDB from '../db/jsonDB';

class CharactersDB extends JsonDB {
	constructor() {
		super('./data/people.json');
	}

	load() {
		return super.load().then(() => {
			this._items = this._items.sort((charcter1,charcter2) => {
				return charcter1.name < charcter2.name ? -1 : 1;
			});
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}
}

const charactersDB = new CharactersDB();
export default charactersDB;
