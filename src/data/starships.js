'use strict';

import JsonDB from '../db/jsonDB';
import {getSorter} from '../tools/functions';

class StarshipsDB extends JsonDB {
	constructor() {
		super('./data/starships.json');
	}

	load() {
		const sorter = getSorter('name');
		return super.load().then(() => {
			this._items = this._items.sort(sorter);
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}

}

const starshipsDB = new StarshipsDB();

export default starshipsDB;
