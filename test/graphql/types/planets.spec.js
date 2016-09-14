'use strict';

import {expect} from 'chai';
import {describe, it} from 'mocha';

import {getFieldsExtractor, doRequest} from './tools';

import { createApp } from '../../../src/app.js';

import jsonPlanets from '../../../data/planets.json';
const expectedPlanets =
  jsonPlanets.map((item) => {
	  const obj = Object.assign({}, item);
		for (let field of ['climate', 'terrain']) {
			obj[field] = item[field].split(',').map(s => s.trim());
		}
		return obj;
  	})
	.sort((planet1, planet2) => {
	  return planet1.name < planet2.name ? -1 : 1;
  	});

let app;
describe('Planets tests suite', function() {
	before(function(done) {
		createApp().then(
			(_app)  => { app = _app; done();},
			(err) => { done(err); }
		);
	});
	describe('Planet list tests suite', function() {
		it('List should be in alphabetical order along with valid data', function(done) {
			doRequest(app, '{planets{name,diameter,rotation_period,orbital_period,gravity,population,climate,terrain,surface_water}}')
				//.expect(200)
				.expect((response) => {
					console.log(response.body.errors);
					const extractor = getFieldsExtractor('name','diameter','rotation_period','orbital_period','gravity','population','climate','terrain','surface_water');
					const expectedResult = expectedPlanets.map(extractor);
					const actualResult = response.body.data.planets;
					expect(actualResult).to.be.deep.equal(expectedResult);
					expect(response.body.errors).to.be.undefined;
				})
				.end(done);
		});
	});
});
