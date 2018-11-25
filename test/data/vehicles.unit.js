'use strict';

import { loadVehiclesDB } from '../../src/db';
import { expect } from 'chai';
import { filterByName } from './tools';

describe('VehiclesDB test', function () {
	let vehiclesDB;

	before(async function () {
		vehiclesDB = await loadVehiclesDB();
	});

	it('Should returns all vehicles', function () {
		expect(vehiclesDB.all().length).to.be.deep.equal(39);
	});

	describe('filterByName test', function () {
		it('Should return the matching vehicles', function () {
			filterByName(vehiclesDB, 'Sand Crawler', 1);
		});
		it('Should return all matching vehicles', function () {
			filterByName(vehiclesDB, 'sAnD C', 1);
		});
		it('Should return an empty array: no matching specie', function () {
			filterByName(vehiclesDB, 'revgbebcugh', 0);
		});
	});
});
