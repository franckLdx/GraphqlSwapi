'use strict';

import charactersDB from '../../src/data/characters.js';
import {expect} from 'chai';

describe('charactersDB test', function() {
	before(function(done) {
		charactersDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		);
	});
	it('Should returns all characters', function() {
		expect(charactersDB.findAll().length).to.be.deep.equal(87);
	});
	describe('findByName test', function() {
		it('Should return the matching character', function() {
			const result = charactersDB.findByName('LUKE');
			expect(result.length).to.be.deep.equal(1);
			expect(result[0].name).to.be.deep.equal('Luke Skywalker');
		});
		it('Should return all matching characters', function() {
			const result = charactersDB.findByName('Skywalker');
			expect(result.length).to.be.deep.equal(3);
			for (let item of result) {
				expect(item.name).to.contain('Skywalker');
			}
		});
		it('Should return an empty array: no matching characters', function() {
			const result = charactersDB.findByName('revgbebcugh');
			expect(result.length).to.be.deep.equal(0);
		});
	});
	describe('findOneByUrl test', function() {
		it('Should return a movie', function() {
			const url = 'http://swapi.co/api/people/18/';
			expect(charactersDB.findOneByUrl(url).url).to.be.deep.equal(url);
		});
		it('Should return undefined when given a wrong URL', function() {
			const url = 'http://swapi.co/api/people/100/';
			expect(charactersDB.findOneByUrl(url)).to.be.undefined;
		});
	});
});
