'use strict';

import JsonDB from '../../src/db/jsonDB';
import {expect} from 'chai';

const dataDir = './test/db';

describe('JsonDB test', function() {
	describe('loading file tests', function() {
		it('Loading a non existing file should failed', function(done) {
			const empty = new JsonDB('foo');
			empty.load().then(
				()=> {done('Should get an error');},
				() => {done();}
			);
		});
		it('Loading a non valid json file should failed', function(done) {
			const empty = new JsonDB(`${dataDir}/wrong.json`);
			empty.load().then(
				()=> {done('Should get an error');},
				(err) => {
					expect(err).to.be.an.instanceof(SyntaxError);
					done();
				}
			).catch(done);
		});
		it('Loading a valid json file should work', function(done) {
			const valid = new JsonDB(`${dataDir}/valid.json`);
			valid.load().then(
				() => {done();},
				done
			);
		});
		it('Loading a valid json file should work, event with a transformation', function(done) {
			const valid = new JsonDB(`${dataDir}/valid.json`);
			valid.load(item => {
				const obj = Object.create(item);
				obj.id *= 100;
				return obj;
			}).then(
				(db) => {
					const items = db.findAll();
					expect(items[0].id).to.be.equal(100);
					expect(items[1].id).to.be.equal(200);
					done();
				}
			).catch(done);
		});
	});
	describe('find methods tests', function() {
		let db;
		before(function(done) {
			db = new JsonDB(`${dataDir}/valid.json`);
			db.load().then(
				() => {done();},
				done
			);
		});
		it('FindAll should return all', function() {
			expect(db.findAll().length).to.be.equal(2);
		});
		describe('findOne method tests', function() {
			it('findOne should return the machting item', function() {
				expect(db.findOne(item => item.id===1).id).to.be.equal(1);
			});
			it('findOne should return undefined when no item match', function() {
				expect(db.findOne(item => item.id==='f!crxe*?;')).to.be.undefined;
			});
		});
		describe('findOneByUrl method tests', function() {
			it('findOneByUrl should return the machting item', function() {
				const url = "http://swapi.co/api/films/1/";
				expect(db.findOneByUrl(url).url).to.be.deep.equal(url);
			});
			it('findOneByUrl should return undefined when no item match', function() {
				const url = "http://swapi.co/api/films/42084239/";
				expect(db.findOneByUrl()).to.be.undefined;
			});
		});
		describe('findString method tests', function() {
			it('findString should return the machting item', function() {
				const string = "PhantoM";
				const result = db.findString(string, 'misc');
				expect(result.length).to.be.deep.equal(1);
				expect(result[0].misc.toLowerCase()).to.contain(string.toLowerCase());
			});
			it('findString should return undefined when no item match', function() {
				const string = "the";
				const result = db.findString(string, 'misc');
				expect(result.length).to.be.deep.equal(2);
				for (let item of result) {
					expect(item.misc.toLowerCase()).to.contain(string.toLowerCase());
				}
			});
		});
		describe('find method tests', function() {
			it('find should return the machting item', function() {
				const found = db.find(item => item.id===1);
				expect(found.length).to.be.deep.equal(1);
				expect(found[0].id).to.be.deep.equal(1);
			});
			it('find should return all machting items', function() {
				const found = db.find(item => true);
				expect(found.length).to.be.deep.equal(2);
			});
			it('find should return an empty array when no item match', function() {
				expect(db.find(item => item.id==='f!crxe*?;').length).to.be.deep.equal(0);
			});
		});
	});
});
