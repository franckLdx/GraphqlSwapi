'use strict';

import JsonDB from '../db/jsonDB';
import {getSorter} from '../tools/functions';

class VehiclesDB extends JsonDB {
	constructor() {
		super('./data/vehicles.json');
	}

	load() {
		return super.load().then(() => {
			const sorter = getSorter('name');
			this._items = this._items.sort(sorter);
			return this;
		});
	}

	findByName(name) {
		return this.findString(name, 'name');
	}
}

const vehiclesDB = new VehiclesDB();
export default vehiclesDB;
