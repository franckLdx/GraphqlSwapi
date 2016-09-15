'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';

import {getFieldsExtractor, doRequest} from './tools';

import { createApp } from '../../../src/app.js';

import jsonCharacters from '../../../data/people.json';
const expectedCharacters =
  jsonCharacters.sort((character1, character2) => {
	  return character1.name < character2.name ? -1 : 1;
  });

import util from 'util';

let app;
describe('Characters tests suite', function() {
	before(function(done) {
		createApp().then(
			(_app)  => { app = _app; done();},
			(err) => { done(err); }
		);
	});
	describe('Characters list tests suite', function() {
		it('List should be in alphabetical order along with valid data', function(done) {
			doRequest(app, '{characters{name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.expect(200)
				.expect((response) => {
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = expectedCharacters.map(extractor);
					const actualCharacters = response.body.data.characters;
					expect(actualCharacters).to.be.deep.equal(expectedResult);
				})
				.end(done);
		});
	});
	describe('Characters by name test suite', function() {
		it('Should get a character based on his name', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters).to.be.deep.equal(expectedResult);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Should get a character based on an extract of his name', function(done) {
			doRequest(app, '{characterByName(name:"aCkb"){name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters).to.be.deep.equal(expectedResult);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Should get an empty list when ask for a dummy name', function(done) {
			doRequest(app, '{characterByName(name:"donald vador"){name}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equal(0);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Should get an error when providing an invalid name', function(done) {
			doRequest(app, '{characterByName(name:"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"){name}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data).to.be.null;
					expect(response.body.errors).not.to.be.undefined;
				})
				.end(done);
		});
	});
	describe('Related types should be in the response', function() {
		it('Films should be in the response', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,films{title}}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','films');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters.films.length).to.be.deep.equal(expectedResult.films.length);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Homeworld should be in the response', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,homeworld{name}}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equals(1);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters.homeworld).not.to.be.undefined;
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Species should be in the response', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,species{name}}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','species');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters.species.length).to.be.deep.equal(expectedResult.species.length);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Starships should be in the response', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,starships{name}}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','starships');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters.starships.length).to.be.deep.equal(expectedResult.starships.length);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
		it('Vehicles should be in the response', function(done) {
			doRequest(app, '{characterByName(name:"Ackbar"){name,vehicles{name}}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data.characterByName.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','vehicles');
					const expectedResult = extractor(expectedCharacters[0]);
					const actualCharacters = response.body.data.characterByName[0];
					expect(actualCharacters.vehicles.length).to.be.deep.equal(expectedResult.vehicles.length);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
	});
});
