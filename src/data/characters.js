'use strict';

import JsonDB from '../db/jsonDB';

class CharactersDB extends JsonDB {
	constructor() {
		super('./data/people.json');
	}

	load() {
		return super.load().then(() => {
			this._items = this._items.sort(({name1}, {name2}) => name1 < name2 ? -1 : 1);
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}
};

const charactersDB = new CharactersDB();
export default charactersDB;
