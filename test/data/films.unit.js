'use strict';

import { loadFilmsDB } from '../../src/db';
import { expect } from 'chai';

describe('FilmsDB test', function () {
	let filmsDB;
	before(async function () {
		filmsDB = await loadFilmsDB();
	});
	it('findAll should returns all movies', function () {
		expect(filmsDB.all().length).to.be.deep.equal(7);
	});
	describe('getById test', function () {
		it('Should return a movie', function () {
			const id = '5';
			expect(filmsDB.getById(id).id).to.be.deep.equal(id);
		});
		it('Should return undefined when id does not match', function () {
			expect(filmsDB.getById(1000)).to.be.undefined;
		});
	});
	describe('getById test', function () {
		it('Should return a movie', function () {
			const id = '1';
			expect(filmsDB.getById(id).id).to.be.deep.equal(id);
		});
		it('Should return undefined when id does not match', function () {
			const id = '100';
			expect(filmsDB.getById(id)).to.be.undefined;
		});
	});
	describe('filterByTitle test', function () {
		it('Should return a movie', function () {
			const result = filmsDB.filterByTitle('menace');
			expect(result[0].id).to.be.deep.equal('1');
			expect(result.length).to.be.deep.equal(1);
		});
		it('Should return matching movies', function () {
			const result = filmsDB.filterByTitle('the');
			expect(result.length).to.be.deep.equal(6);
		});
		it('Should return an empty array when no item match', function () {
			expect(filmsDB.filterByTitle('dark donald').length).to.be.deep.equal(0);
		});
	});
});
