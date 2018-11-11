'use strict';

import fs from '../tools/fs';

export default class JsonDB {
	constructor(items) {
		this._items = items;
	}

	findAll() {
		return this._items;
	}

	findOne(selector) {
		return this._items.find(selector);
	}

	findOneByUrl(url) {
		return this.findOne(item => item.url === url);
	}

	find(selector) {
		return this._items.filter(selector);
	}

	findString(expectedValue, fieldName) {
		const searched = expectedValue.toLowerCase();
		return this.find(item => item[fieldName].toLowerCase().indexOf(searched) !== -1);
	}

	findByUrls(urls) {
		if (!urls) {
			return [];
		}
		return urls.map(url => this.findOneByUrl(url));
	}
}
