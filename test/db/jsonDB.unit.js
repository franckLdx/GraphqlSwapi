'use strict';

import { getDB } from '../../src/db/jsonDB';
import { expect } from 'chai';
import { loadJsonFile } from '../../src/tools/functions';

const dataDir = './test/db';

describe('JsonDB test', function () {
	describe('loading file tests', function () {
		it('Loading a non existing file should failed', function () {
			return loadJsonFile('foo')
				.then(() => Promise.reject('Should get an error'))
				.catch(() => Promise.resolve());
		});
		it('Loading a non valid json file should failed', function () {
			return loadJsonFile(`${dataDir}/wrong.json`)
				.then(() => Promise.reject('Should get an error'))
				.catch((err) => {
					expect(err).to.be.an.instanceof(SyntaxError);
				});
		});
		it('Loading a valid json file should work', function () {
			return loadJsonFile(`${dataDir}/valid.json`);
		});
	});
	describe('find methods tests', function () {
		let db;
		before(async function () {
			const items = await loadJsonFile(`${dataDir}/valid.json`);
			db = getDB(items);
		});
		it('All should return all', function () {
			expect(db.all().length).to.be.equal(2);
		});
		describe('find method tests', function () {
			it('find should return the machting item', function () {
				expect(db.find(item => item.id === 1)[0].id).to.be.equal(1);
			});
			it('find should return undefined when no item match', function () {
				expect(db.find(item => item.id === 'f!crxe*?;').length).to.be.equal(0);
			});
		});
		describe('getById method tests', function () {
			it('getById should return the machting item', function () {
				const id = 1;
				expect(db.getById(id).id).to.be.deep.equal(id);
			});
			it('getById should return undefined when no item match', function () {
				const id = "42084239";
				expect(db.getById(id)).to.be.undefined;
			});
		});
		describe('filterString method tests', function () {
			it('filterString should return the machting item', function () {
				const string = "PhantoM";
				const result = db.filterString(string, 'misc');
				expect(result.length).to.be.deep.equal(1);
				expect(result[0].misc.toLowerCase()).to.contain(string.toLowerCase());
			});
			it('filterString should return undefined when no item match', function () {
				const string = "the";
				const result = db.filterString(string, 'misc');
				expect(result.length).to.be.deep.equal(2);
				for (let item of result) {
					expect(item.misc.toLowerCase()).to.contain(string.toLowerCase());
				}
			});
		});
		describe('filter method tests', function () {
			it('filter should return the machting item', function () {
				const found = db.filter(item => item.id === 1);
				expect(found.length).to.be.deep.equal(1);
				expect(found[0].id).to.be.deep.equal(1);
			});
			it('filter should return all machting items', function () {
				const found = db.filter(item => true);
				expect(found.length).to.be.deep.equal(2);
			});
			it('filter should return an empty array when no item match', function () {
				expect(db.filter(item => item.id === 'f!crxe*?;').length).to.be.deep.equal(0);
			});
		});
	});
	describe('find method tests', function () {
		it('find should return the machting item', function () {
			const id = '1';
			const found = db.find(item => item.id === id);
			expect(found[0].id).to.be.deep.equal(id);
		});
		it('filter should return undefined when no item match', function () {
			expect(db.filter(item => item.id === 'f!crxe*?;').length).to.be.undefined;
		});
	});
});
