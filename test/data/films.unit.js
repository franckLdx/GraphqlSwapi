'use strict';

import filmsDB from '../../src/data/films.js';
import {expect} from 'chai';

describe('FilmsDB test', function() {
	before(function(done) {
		filmsDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		)
	});
	it('findAll should returns all movies', function() {
		expect(filmsDB.findAll().length).to.be.deep.equal(7);
	});
	describe('findById test', function() {
		it('Should return a movie', function() {
			expect(filmsDB.findById(5).id).to.be.deep.equal(5);
		});
		it('Should return undefined when id does not match', function() {
			expect(filmsDB.findById(1000)).to.be.undefined;
		});
	});
	describe('findOneByUrl test', function() {
		it('Should return a movie', function() {
			const url = 'http://swapi.co/api/films/1/';
			expect(filmsDB.findOneByUrl(url).url).to.be.deep.equal(url);
		});
		it('Should return undefined when URL does not ', function() {
			const url = 'http://swapi.co/api/films/100/';
			expect(filmsDB.findOneByUrl(url)).to.be.undefined;
		});
	});
	describe('findByTitle test', function() {
		it('Should return a movie', function() {
			const result = filmsDB.findByTitle('menace');
			expect(result[0].id).to.be.deep.equal(1);
			expect(result.length).to.be.deep.equal(1);
		});
		it('Should return matching movies', function() {
			const result = filmsDB.findByTitle('the');
			expect(result.length).to.be.deep.equal(6);
		});
		it('Should return an empty array when no item match', function() {
			expect(filmsDB.findByTitle('dark donald').length).to.be.deep.equal(0);
		});
	});
});
