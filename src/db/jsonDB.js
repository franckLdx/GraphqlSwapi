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
		return this.findOne(item => item.url===url);
	}

	findOne(selector) {
		return this._items.find(selector);
	}

	find(selector) {
		return this._items.filter(selector);
	}
}
