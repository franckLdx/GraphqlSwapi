'use strict';

import { loadCharactersDB } from '../../src/db';
import { expect } from 'chai';
import { filterByName } from './tools';

describe('charactersDB test', function () {
	let charactersDB;
	before(async function () {
		charactersDB = await loadCharactersDB();
	});
	it('Should returns all characters', function () {
		expect(charactersDB.all().length).to.be.deep.equal(87);
	});
	describe('filterByName test', function () {
		it('Should return the matching character', function () {
			filterByName(charactersDB, 'LUKE', 1);
		});
		it('Should return all matching characters', function () {
			filterByName(charactersDB, 'Skywalker', 3);
		});
		it('Should return an empty array: no matching characters', function () {
			filterByName(charactersDB, 'revgbebcugh', 0);
		});
	});
	describe('getById test', function () {
		it('Should return a character', function () {
			const id = '18';
			expect(charactersDB.getById(id).id).to.be.deep.equal(id);
		});
		it('Should return undefined when given a wrong URL', function () {
			const id = '100';
			expect(charactersDB.getById(id)).to.be.undefined;
		});
	});
});
