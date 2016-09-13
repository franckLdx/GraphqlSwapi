'use strict';

import filmsDB from '../../src/data/films.js';
import {expect} from 'chai';

const dataDir = './test/db';

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
		it('findById should return a movie', function() {
			expect(filmsDB.findById(5).id).to.be.deep.equal(5);
		});
		it('findById with a wrong id should return undefined', function() {
			expect(filmsDB.findById(1000)).to.be.undefined;
		});
	});
	describe('findByUrl test', function() {
		it('findByUrl should return a movie', function() {
			const url = 'http://swapi.co/api/films/1/';
			expect(filmsDB.findByUrl(url).url).to.be.deep.equal(url);
		});
		it('findByUrl with a wrong URL should return undefined', function() {
			const url = 'http://swapi.co/api/films/100/';
			expect(filmsDB.findByUrl(url)).to.be.undefined;
		});
	});
	describe('findByTitle test', function() {
		it('findByTitle should return a movie', function() {
			const result = filmsDB.findByTitle('menace');
			expect(result[0].id).to.be.deep.equal(1);
			expect(result.length).to.be.deep.equal(1);
		});
		it('findByTitle should return matching movies', function() {
			const result = filmsDB.findByTitle('the');
			expect(result.length).to.be.deep.equal(6);
		});
		it('findByTitle should return an empty array when no item match', function() {
			expect(filmsDB.findByTitle('dark donald').length).to.be.deep.equal(0);
		});
	});
});
