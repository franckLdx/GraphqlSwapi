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
	});
});
