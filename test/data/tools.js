'use strict';

import { expect } from 'chai';

export function filterByName(db, name, expectedCount) {
	const result = db.filterByName(name);
	expect(result.length).to.be.deep.equal(expectedCount);
	const expectedValue = name.toLowerCase();
	for (let item of result) {
		expect(item.name.toLowerCase()).to.contain(expectedValue);
	}
}
