'use strict';

import vehiclesDB from '../../src/data/vehicles';
import {expect} from 'chai';
import {findByName} from './tools';

describe('VehiclesDB test', function() {
	before(function(done) {
		vehiclesDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		);
	});

	it('Should returns all vehicles', function() {
		expect(vehiclesDB.findAll().length).to.be.deep.equal(39);
	});

	describe('findByName test', function() {
		it('Should return the matching vehicles', function() {
			findByName(vehiclesDB, 'Sand Crawler', 1);
		});
		it('Should return all matching vehicles', function() {
			findByName(vehiclesDB, 'sAnD C', 1);
		});
		it('Should return an empty array: no matching specie', function() {
			findByName(vehiclesDB, 'revgbebcugh', 0);
		});
	});
});
