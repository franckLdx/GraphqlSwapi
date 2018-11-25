'use strict';

import { loadSpeciesDB } from '../../src/db';
import { expect } from 'chai';
import { filterByName } from './tools';

describe('SpeciesDB test', function () {
	let speciesDB;
	before(async function () {
		speciesDB = await loadSpeciesDB();
	});

	it('Should returns all species', function () {
		expect(speciesDB.all().length).to.be.deep.equal(37);
	});

	describe('classification tests', function () {
		it('Should returns all species for a classification', function () {
			expect(speciesDB.filterByClassification('MAMMAL').length).to.be.deep.equal(17);
		});

		it('Should an empty list for an unknown classification', function () {
			expect(speciesDB.filterByClassification('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('Designation tests', function () {
		it('Should returns all species for a designation', function () {
			expect(speciesDB.filterByDesignation('SENTIENT').length).to.be.deep.equal(36);
		});

		it('Should an empty list for an unknown desingation', function () {
			expect(speciesDB.filterByDesignation('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('filterByName test', function () {
		it('Should return the matching species', function () {
			filterByName(speciesDB, 'Aleena', 1);
		});
		it('Should return all matching species', function () {
			filterByName(speciesDB, 'aLee', 2);
		});
		it('Should return an empty array: no matching specie', function () {
			filterByName(speciesDB, 'revgbebcugh', 0);
		});
	});
});
