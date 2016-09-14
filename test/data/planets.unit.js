'use strict';

import planetsDB from '../../src/data/planets';
import {expect} from 'chai';
import {findByName} from './tools';

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
			findByName(planetsDB, 'Alderaan', 1);
		});
		it('Should return all matching planets', function() {
			findByName(planetsDB, 'deraa', 1);
		});
		it('Should return an empty array: no matching planet', function() {
			findByName(planetsDB, 'revgbebcugh', 0);
		});
	});
});
