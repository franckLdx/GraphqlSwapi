'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';

import {getFieldsExtractor, doRequest} from './tools';

import { createApp } from '../../../src/app.js';

import jsonSpecies from '../../../data/species.json';
const expectedSpecies = jsonSpecies.map(specie => {
	const obj = Object.assign(specie);
	for (let field of ['eye_colors', 'hair_colors','skin_colors']) {
		obj[field] = specie[field].split(',').map(s => s.trim());
	}
	for (let field of ['classification','designation']) {
		obj[field] = specie[field].trim().toUpperCase();
	}
	if (specie.classification === 'MAMMALS') {
		obj.classification = 'MAMMAL';
	}
	return obj;
}).sort((specie1, specie2) => specie1.name < specie2.name ? -1 : 1);

function expectedByField(fieldName,value) {
	const wanted = value.trim().toUpperCase();
	return expectedSpecies.filter(s => s[fieldName] === wanted);
}

let app;
describe('Species tests suite', function() {
	before(function(done) {
		createApp().then(
			(_app) => { app = _app; done();},
			(err) => { done(err); }
		);
	});
	describe('Species list tests suite', function() {
		it('A List should be in alphabetical order along with valid data', function(done) {
			doRequest(app, '{species{name,classification,designation,average_height,average_lifespan,eye_colors,hair_colors,skin_colors,language}}')
				.checkOKResponse(({species: actualResult}) => {
					const extractor = getFieldsExtractor('name','classification','designation','average_height','average_lifespan','eye_colors','hair_colors','skin_colors','language');
					const expectedResult = expectedSpecies.map(extractor);
					expect(actualResult).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
	});
	describe('Species by name test suite', function() {
		it('Should get a specie based on his name', function(done) {
			doRequest(app, '{specieByName(name:"Aleena"){name}}')
				.checkOKResponse(({specieByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name');
					const expectedResult = extractor(expectedSpecies[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
		it('Should get a specie based on an extract of his name', function(done) {
			doRequest(app, '{specieByName(name:"aLeen"){name}}')
				.checkOKResponse(({specieByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name');
					const expectedResult = extractor(expectedSpecies[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
		it('Should get an empty list when ask for a dummy name', function(done) {
			doRequest(app, '{specieByName(name:"duck"){name}}')
				.checkOKResponse(({specieByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(0);
				})
				.end(done);
		});
		it('Should get an error when providing an invalid name', function(done) {
			doRequest(app, '{specieByName(name:"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"){name}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data).to.be.null;
					expect(response.body.errors).not.to.be.undefined;
				})
				.end(done);
		});
	});
	describe('Species Classification tests suite', function() {
		it('Sould return species for the given classification', function(done) {
			const classification = 'AMPHIBIAN';
			doRequest(app, `{specieByClassification(classification:${classification}){name,classification}}`)
				.checkOKResponse(({specieByClassification: actualResult}) => {
					const extractor = getFieldsExtractor('name','classification');
					const expectedResult = expectedByField('classification', classification).map(extractor);	expect(actualResult).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
	});
	describe('Species Designation tests suite', function() {
		it('Should return species for the given designation', function(done) {
			const designation = 'SENTIENT';
			doRequest(app, `{specieByDesignation(designation:${designation}){name,designation}}`)
				.checkOKResponse(({specieByDesignation: actualResult}) => {
					const extractor = getFieldsExtractor('name','designation');
					const expectedResult = expectedByField('designation', designation).map(extractor);
					expect(actualResult).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
	});
});
