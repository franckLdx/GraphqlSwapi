'use strict';

import { loadStarshipsDB } from '../../src/db';
import { expect } from 'chai';
import { findByName } from './tools';

describe('StarshipsDB test', function () {
	let starshipsDB;
	before(async function () {
		starshipsDB = await loadStarshipsDB();
	});
	it('Should returns all characters', function () {
		expect(starshipsDB.findAll().length).to.be.deep.equal(37);
	});

	describe('findByName test', function () {
		it('Should return the matching starships', function () {
			findByName(starshipsDB, 'Sentinel-class landing craft', 1);
		});
		it('Should return all matching starships', function () {
			findByName(starshipsDB, 'senTineL-clASs', 1);
		});
		it('Should return an empty array: no matching starship', function () {
			findByName(starshipsDB, 'revgbebcugh', 0);
		});
	});

	describe('findOneByUrl test', function () {
		it('Should return a movie', function () {
			const url = 'https://swapi.co/api/starships/5/';
			expect(starshipsDB.findOneByUrl(url).url).to.be.deep.equal(url);
		});
		it('Should return undefined when given a wrong URL', function () {
			const url = 'https://swapi.co/api/starships/100/';
			expect(starshipsDB.findOneByUrl(url)).to.be.undefined;
		});
	});
});
