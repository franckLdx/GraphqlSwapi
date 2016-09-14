'use strict';

import planetsDB from '../../src/data/planets';
import {expect} from 'chai';

describe('PlanetsDB test', function() {
	before(function(done) {
		planetsDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		);
	});

	it('Should returns all planets', function() {
		expect(planetsDB.findAll().length).to.be.deep.equal(61);
	});

	describe('findByName test', function() {
		it('Should return the matching planets', function() {
			const name = 'Alderaan';
			const result = planetsDB.findByName(name);
			expect(result.length).to.be.deep.equal(1);
			expect(result[0].name).to.be.deep.equal(name);
		});
		it('Should return all matching planets', function() {
			const name = 'deraa';
			const result = planetsDB.findByName(name);
			expect(result.length).to.be.deep.equal(1);
			const expectedValue = name.toLowerCase();
			for (let item of result) {
				expect(item.name.toLowerCase()).to.contain(expectedValue);
			}
		});
		it('Should return an empty array: no matching planet', function() {
			const result = planetsDB.findByName('revgbebcugh');
			expect(result.length).to.be.deep.equal(0);
		});
	});
});
