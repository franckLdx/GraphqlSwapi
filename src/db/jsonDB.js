'use strict';

import fs from '../tools/fs';

export function getDB(items) {
	return {
		all() {
			return items;
		},

		findByIds(ids) {
			if (!ids) {
				return [];
			}
			return ids.map(id => this.getById(id));
		},

		getById(id) {
			return this.find(item => item.id === id);
		},

		filterString(expectedValue, fieldName) {
			const searched = expectedValue.trim().toLowerCase();
			return this.filter(item => item[fieldName].toLowerCase().indexOf(searched) !== -1);
		},

		find(selector) {
			return items.find(selector);
		},

		filter(selector) {
			return items.filter(selector);
		},
	};
}

import { urlToId } from "../tools/functions";

export function urlToIdMapper(item) {
	const { url, ...data } = item;
	const obj = Object.assign({}, data, {
		id: urlToId(url),
	});
	return obj;
};