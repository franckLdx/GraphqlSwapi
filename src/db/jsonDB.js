'use strict';

import fs from './fs';

export default class JsonDB {
	constructor(fileName) {
		this._fileName = fileName;
		this._items = undefined;
	}

	load() {
		return fs.readFile(this._fileName).then((string) => {
			this._items = JSON.parse(string);
			return this;
		});
	}

	findAll() {
		return this._items;
	}

	findByUrl(url) {
		this._items.find(item => item.url===url);
	}
}
