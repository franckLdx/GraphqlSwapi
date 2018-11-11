'use strict';

import JsonDB from '../db/jsonDB';
import { getSorter, loadJsonFile } from '../tools/functions';

class StarshipsDB {

	async load() {
		const sorter = getSorter('name');
		const items = (await loadJsonFile('./data/starships.json')).sort(sorter);
		this._db = new JsonDB(items);
		return this;
	}

	findByName(name) {
		return this._db.findString(name, 'name');
	}

}

const starshipsDB = new StarshipsDB();

export default starshipsDB;
