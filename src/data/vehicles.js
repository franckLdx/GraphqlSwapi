'use strict';

import JsonDB from '../db/jsonDB';
import { getSorter, loadJsonFile } from '../tools/functions';

class VehiclesDB {

	async load() {
		const sorter = getSorter('name');
		const items = (await loadJsonFile('./data/vehicles.json')).sort(sorter);
		this._db = new JsonDB(items);
		return this;
	}

	findByName(name) {
		return this.db.findString(name, 'name');
	}
}

const vehiclesDB = new VehiclesDB();
export default vehiclesDB;
