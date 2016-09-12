'use strict';

import fs from './fs';

export default class JsonDB {
	constructor(fileName) {
		this._fileName = fileName;
		this._items = undefined;
	}

	load(transformer=undefined) {
		return fs.readFile(this._fileName).then((string) => {
			const raw = JSON.parse(string);
			this._items = transformer ? raw.map(transformer) : raw;
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
