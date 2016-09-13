'use strict';

import speciesDB from '../../src/data/species';
import {expect} from 'chai';

describe('SpeciesDB test', function() {
	before(function(done) {
		speciesDB.load().then(
			()=>{done();},
			(err)=>{done(err);}
		)
	});
	it('Should returns all species', function() {
		expect(speciesDB.findAll().length).to.be.deep.equal(37);
	});
});
