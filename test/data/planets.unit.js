'use strict';

import { loadPlanetsDB } from '../../src/db';
import { expect } from 'chai';

describe('PlanetsDB test', function () {
	let planetsDB;

	before(async function () {
		planetsDB = await loadPlanetsDB();
	});

	it('Should returns all planets', function () {
		expect(planetsDB.all().length).to.be.deep.equal(61);
	});

	describe('filterByName test', function () {
		it('Should return the matching planets', function () {
			filterByName(planetsDB, 'Alderaan', 1);
		});
		it('Should return all matching planets', function () {
			filterByName(planetsDB, 'deraa', 1);
		});
		it('Should return an empty array: no matching planet', function () {
			filterByName(planetsDB, 'revgbebcugh', 0);
		});
	});
});
