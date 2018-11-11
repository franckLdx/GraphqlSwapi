'use strict';

import JsonDB from '../../src/db/jsonDB';
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
			db = new JsonDB(items);
		});
		it('FindAll should return all', function () {
			expect(db.findAll().length).to.be.equal(2);
		});
		describe('findOne method tests', function () {
			it('findOne should return the machting item', function () {
				expect(db.findOne(item => item.id === 1).id).to.be.equal(1);
			});
			it('findOne should return undefined when no item match', function () {
				expect(db.findOne(item => item.id === 'f!crxe*?;')).to.be.undefined;
			});
		});
		describe('findOneByUrl method tests', function () {
			it('findOneByUrl should return the machting item', function () {
				const url = "http://swapi.co/api/films/1/";
				expect(db.findOneByUrl(url).url).to.be.deep.equal(url);
			});
			it('findOneByUrl should return undefined when no item match', function () {
				const url = "http://swapi.co/api/films/42084239/";
				expect(db.findOneByUrl()).to.be.undefined;
			});
		});
		describe('findString method tests', function () {
			it('findString should return the machting item', function () {
				const string = "PhantoM";
				const result = db.findString(string, 'misc');
				expect(result.length).to.be.deep.equal(1);
				expect(result[0].misc.toLowerCase()).to.contain(string.toLowerCase());
			});
			it('findString should return undefined when no item match', function () {
				const string = "the";
				const result = db.findString(string, 'misc');
				expect(result.length).to.be.deep.equal(2);
				for (let item of result) {
					expect(item.misc.toLowerCase()).to.contain(string.toLowerCase());
				}
			});
		});
		describe('find method tests', function () {
			it('find should return the machting item', function () {
				const found = db.find(item => item.id === 1);
				expect(found.length).to.be.deep.equal(1);
				expect(found[0].id).to.be.deep.equal(1);
			});
			it('find should return all machting items', function () {
				const found = db.find(item => true);
				expect(found.length).to.be.deep.equal(2);
			});
			it('find should return an empty array when no item match', function () {
				expect(db.find(item => item.id === 'f!crxe*?;').length).to.be.deep.equal(0);
			});
		});
	});
});
