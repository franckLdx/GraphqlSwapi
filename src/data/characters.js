'use strict';

import JsonDB from '../db/jsonDB';

class CharactersDB extends JsonDB {
	constructor() {
		super('../../data/people.json');
	}

	load() {
		super.load().then(() => {
			this._items = this._items.sort(({name1}, {name2}) => name1 < name2 ? -1 : 1);
			return this;
		});
	}
};

export default new CharactersDB;
