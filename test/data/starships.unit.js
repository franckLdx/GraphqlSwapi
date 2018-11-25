'use strict';

import { loadStarshipsDB } from '../../src/db';
import { expect } from 'chai';
import { filterByName } from './tools';

describe('StarshipsDB test', function () {
	let starshipsDB;
	before(async function () {
		starshipsDB = await loadStarshipsDB();
	});
	it('Should returns all characters', function () {
		expect(starshipsDB.all().length).to.be.deep.equal(37);
	});

	describe('filterByName test', function () {
		it('Should return the matching starships', function () {
			filterByName(starshipsDB, 'Sentinel-class landing craft', 1);
		});
		it('Should return all matching starships', function () {
			filterByName(starshipsDB, 'senTineL-clASs', 1);
		});
		it('Should return an empty array: no matching starship', function () {
			filterByName(starshipsDB, 'revgbebcugh', 0);
		});
	});

	describe('getById test', function () {
		it('Should return a movie', function () {
			const id = '5';
			expect(starshipsDB.getById(id).id).to.be.deep.equal(id);
		});
		it('Should return undefined when given a wrong URL', function () {
			const id = '100';
			expect(starshipsDB.getById(id)).to.be.undefined;
		});
	});
});
