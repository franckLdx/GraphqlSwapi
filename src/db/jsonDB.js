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

	findOne(selector) {
		return this._items.find(selector);
	}

	findOneByUrl(url) {
		return this.findOne(item => item.url===url);
	}

	find(selector) {
		return this._items.filter(selector);
	}

	findString(expectedValue, fieldName) {
		const searched = expectedValue.toLowerCase();
		return this.find(item => item[fieldName].toLowerCase().indexOf(searched)!==-1);
	}

	findByUrls(urls) {
		debugger;if (!urls) {
			return [];
		}
		return urls.map(url => this.findOneByUrl(url));
	}
}
