'use strict';

import { loadCharactersDB } from '../../src/db';
import { expect } from 'chai';
import { findByName } from './tools';

describe('charactersDB test', function () {
	let charactersDB;
	before(async function () {
		charactersDB = await loadCharactersDB();
	});
	it('Should returns all characters', function () {
		expect(charactersDB.findAll().length).to.be.deep.equal(87);
	});
	describe('findByName test', function () {
		it('Should return the matching character', function () {
			findByName(charactersDB, 'LUKE', 1);
		});
		it('Should return all matching characters', function () {
			findByName(charactersDB, 'Skywalker', 3);
		});
		it('Should return an empty array: no matching characters', function () {
			findByName(charactersDB, 'revgbebcugh', 0);
		});
	});
	describe('findOneByUrl test', function () {
		it('Should return a character', function () {
			const url = 'https://swapi.co/api/people/18/';
			expect(charactersDB.findOneByUrl(url).url).to.be.deep.equal(url);
		});
		it('Should return undefined when given a wrong URL', function () {
			const url = 'http://swapi.co/api/people/100/';
			expect(charactersDB.findOneByUrl(url)).to.be.undefined;
		});
	});
});
