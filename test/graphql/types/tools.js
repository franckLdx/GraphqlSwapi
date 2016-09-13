'use strict';

export function getFieldsExtractor(...fields) {
	return (film) => {
		const result = {};
		for (let field of fields) {
			result[field] = film[field];
		}
		return result;
	};
}
