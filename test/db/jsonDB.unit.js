'use strict';

import JsonDB from '../../src/db/jsonDB';
import {expect} from 'chai';

const dataDir = './test/db';

describe('JsonDB test', function() {
	describe('loading file tests', function() {
		it('Loading a non existring file should failed', function(done) {
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
			const empty = new JsonDB(`${dataDir}/valid.json`);
			empty.load().then(
				() => {done();},
				done
			);
		});
	});
});
