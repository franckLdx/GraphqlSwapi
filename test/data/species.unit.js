'use strict';

import { loadSpeciesDB } from '../../src/db';
import { expect } from 'chai';
import { findByName } from './tools';

describe('SpeciesDB test', function () {
	let speciesDB;
	before(async function () {
		speciesDB = await loadSpeciesDB();
	});

	it('Should returns all species', function () {
		expect(speciesDB.findAll().length).to.be.deep.equal(37);
	});

	describe('classification tests', function () {
		it('Should returns all species for a classification', function () {
			expect(speciesDB.findByClassification('MAMMAL').length).to.be.deep.equal(17);
		});

		it('Should an empty list for an unknown classification', function () {
			expect(speciesDB.findByClassification('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('Designation tests', function () {
		it('Should returns all species for a designation', function () {
			expect(speciesDB.findByDesignation('SENTIENT').length).to.be.deep.equal(36);
		});

		it('Should an empty list for an unknown desingation', function () {
			expect(speciesDB.findByDesignation('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('findByName test', function () {
		it('Should return the matching species', function () {
			findByName(speciesDB, 'Aleena', 1);
		});
		it('Should return all matching species', function () {
			findByName(speciesDB, 'aLee', 2);
		});
		it('Should return an empty array: no matching specie', function () {
			findByName(speciesDB, 'revgbebcugh', 0);
		});
	});
});
