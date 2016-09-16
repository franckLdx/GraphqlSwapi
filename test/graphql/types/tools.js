'use strict';

import request from 'supertest';
import {expect} from 'chai';

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
	const aRequest = request(app)
		.get('/API/')
		.query({query:query});
	aRequest.checkOKResponse = validator => {
		aRequest
			.expect(200)
			.expect(response => {
				expect(response.body.errors).to.be.undefined;
				validator(response.body.data);
			});
		return aRequest;
	};
	return aRequest;
}
