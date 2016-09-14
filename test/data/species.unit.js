'use strict';

import speciesDB from '../../src/data/species';
import {expect} from 'chai';

describe('SpeciesDB test', function() {
	before(function(done) {
		speciesDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		);
	});

	it('Should returns all species', function() {
		expect(speciesDB.findAll().length).to.be.deep.equal(37);
	});

	describe('classification tests', function() {
		it('Should returns all species for a classification', function() {
			expect(speciesDB.findByClassification('MAMMAL').length).to.be.deep.equal(17);
		});

		it('Should an empty list for an unknown classification', function() {
			expect(speciesDB.findByClassification('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('Designation tests', function() {
		it('Should returns all species for a designation', function() {
			expect(speciesDB.findByDesignation('SENTIENT').length).to.be.deep.equal(36);
		});

		it('Should an empty list for an unknown desingation', function() {
			expect(speciesDB.findByDesignation('oncle picson').length).to.be.deep.equal(0);
		});
	});

	describe('findByName test', function() {
		it('Should return the matching species', function() {
			const name = 'Aleena';
			const result = speciesDB.findByName(name);
			expect(result.length).to.be.deep.equal(1);
			expect(result[0].name).to.be.deep.equal(name);
		});
		it('Should return all matching species', function() {
			const name = 'aLee';
			const result = speciesDB.findByName(name);
			expect(result.length).to.be.deep.equal(2);
			for (let item of result) {
				expect(item.name.toLowerCase()).to.contain(name.toLowerCase());
			}
		});
		it('Should return an empty array: no matching specie', function() {
			const result = speciesDB.findByName('revgbebcugh');
			expect(result.length).to.be.deep.equal(0);
		});
	});
});
