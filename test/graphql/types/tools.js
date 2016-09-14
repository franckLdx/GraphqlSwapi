'use strict';

import request from 'supertest';

export function getFieldsExtractor(...fields) {
	return (film) => {
		const result = {};
		for (let field of fields) {
			result[field] = film[field];
		}
		return result;
	};
}

export function doRequest(app, query) {
	return request(app)
		.get('/API/')
		.query({query:query});
}
