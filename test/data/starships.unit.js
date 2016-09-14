'use strict';

import starshipsDB from '../../src/data/starships';
import {expect} from 'chai';

describe('StarshipsDB test', function() {
	before(function(done) {
		starshipsDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		);
	});
	it('Should returns all characters', function() {
		expect(starshipsDB.findAll().length).to.be.deep.equal(37);
	});
	describe('findByName test', function() {
		it('Should return the matching starships', function() {
			const result = starshipsDB.findByName('Sentinel-class landing craft');
			expect(result.length).to.be.deep.equal(1);
			expect(result[0].name).to.be.deep.equal('Sentinel-class landing craft');
		});
		it('Should return all matching starships', function() {
			const result = starshipsDB.findByName('senTineL-clASs');
			expect(result.length).to.be.deep.equal(1);
			for (let item of result) {
				expect(item.name).to.contain('Sentinel-class landing craft');
			}
		});
		it('Should return an empty array: no matching starship', function() {
			const result = starshipsDB.findByName('revgbebcugh');
			expect(result.length).to.be.deep.equal(0);
		});
	});
	describe('findOneByUrl test', function() {
		it('Should return a movie', function() {
			const url = 'http://swapi.co/api/starships/5/';
			expect(starshipsDB.findOneByUrl(url).url).to.be.deep.equal(url);
		});
		it('Should return undefined when given a wrong URL', function() {
			const url = 'http://swapi.co/api/starships/100/';
			expect(starshipsDB.findOneByUrl(url)).to.be.undefined;
		});
	});
});
