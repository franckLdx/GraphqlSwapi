'use strict';

import { loadPlanetsDB } from '../../src/db';
import { expect } from 'chai';
import { findByName } from './tools';

describe('PlanetsDB test', function () {
	let planetsDB;

	before(async function () {
		planetsDB = await loadPlanetsDB();
	});

	it('Should returns all planets', function () {
		expect(planetsDB.findAll().length).to.be.deep.equal(61);
	});

	describe('findByName test', function () {
		it('Should return the matching planets', function () {
			findByName(planetsDB, 'Alderaan', 1);
		});
		it('Should return all matching planets', function () {
			findByName(planetsDB, 'deraa', 1);
		});
		it('Should return an empty array: no matching planet', function () {
			findByName(planetsDB, 'revgbebcugh', 0);
		});
	});
});
