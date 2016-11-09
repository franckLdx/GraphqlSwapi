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

let app;
describe('Characters tests suite', function() {
	before(function() {
		return createApp().then((_app)  => {
      app = _app;
    });
	});
	describe('Characters list tests suite', function() {
		it('List should be in alphabetical order along with valid data', function() {
			return doRequest(app, '{characters{name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.checkOKResponse(({characters: actualResult}) => {
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = expectedCharacters.map(extractor);
					expect(actualResult).to.be.deep.equal(expectedResult);
				});
		});
	});
	describe('Characters by name test suite', function() {
		it('Should get a character based on his name', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get a character based on an extract of his name', function() {
			return doRequest(app, '{charactersByName(name:"aCkb"){name,birth_year,eye_color,hair_color,gender,height,mass,skin_color}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name','birth_year','eye_color','hair_color','gender','height','mass','skin_color');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get an empty list when ask for a dummy name', function() {
			return doRequest(app, '{charactersByName(name:"donald vador"){name}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equal(0);
				});
		});
		it('Should get an error when providing an invalid name', function() {
			return doRequest(app, '{charactersByName(name:"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"){name}}')
				.expect(200)
				.expect((response) => {
					expect(response.body.data).to.be.null;
					expect(response.body.errors).not.to.be.undefined;
				});
		});
	});
	describe('Related types should be in the response', function() {
		it('Films should be in the response', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,films{title}}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','films');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0].films.length).to.be.deep.equal(expectedResult.films.length);
				});
		});
		it('Homeworld should be in the response', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,homeworld{name}}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equals(1);
					expect(actualResult[0].homeworld).not.to.be.undefined;
				});
		});
		it('Species should be in the response', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,species{name}}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','species');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0].species.length).to.be.deep.equal(expectedResult.species.length);
				});
		});
		it('Starships should be in the response', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,starships{name}}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','starships');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0].starships.length).to.be.deep.equal(expectedResult.starships.length);
				});
		});
		it('Vehicles should be in the response', function() {
			return doRequest(app, '{charactersByName(name:"Ackbar"){name,vehicles{name}}}')
				.checkOKResponse(({charactersByName: actualResult}) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name','vehicles');
					const expectedResult = extractor(expectedCharacters[0]);
					expect(actualResult[0].vehicles.length).to.be.deep.equal(expectedResult.vehicles.length);
				});
		});
	});
});
