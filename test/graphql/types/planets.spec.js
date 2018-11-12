'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import { getFieldsExtractor, doRequest } from './tools';

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
describe('Planets tests suite', function () {
	before(async function () {
		app = await createApp();
	});
	describe('Planet list tests suite', () => {
		it('List should be in alphabetical order along with valid data', () => {
			return doRequest(app, '{planets{name,diameter,rotation_period,orbital_period,gravity,population,climate,terrain,surface_water}}')
				.checkOKResponse(({ planets: actualResult }) => {
					const extractor = getFieldsExtractor('name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water');
					const expectedResult = expectedPlanets.map(extractor);
					expect(actualResult).to.be.deep.equal(expectedResult);
				});
		});
	});
	describe('Planets by name test suite', () => {
		it('Should get a planet based on his name', () => {
			return doRequest(app, '{planetsByName(name:"Alderaan"){name}}')
				.checkOKResponse(({ planetsByName: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name');
					const expectedResult = extractor(expectedPlanets[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get a planet based on an extract of his name', () => {
			return doRequest(app, '{planetsByName(name:"dERaAn"){name}}')
				.checkOKResponse(({ planetsByName: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('name');
					const expectedResult = extractor(expectedPlanets[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get an empty list when ask for a dummy name', () => {
			return doRequest(app, '{planetsByName(name:"donald dream"){name}}')
				.checkOKResponse(({ planetsByName: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(0);
				});
		});
		it('Should get an error when providing an invalid name', () => {
			return doRequest(app, '{planetsByName(name:"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"){name}}')
				.expect(500)
				.expect((response) => {
					expect(response.body.data).to.be.null;
					expect(response.body.errors).not.to.be.undefined;
				});
		});
	});
	describe('Related types should be in the response', () => {
		it('Films should be in the response', () => {
			return doRequest(app, '{planetsByName(name:"Alderaan"){name,films{title}}}')
				.checkOKResponse(({ planetsByName: actualResult }) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name', 'films');
					const expectedResult = extractor(expectedPlanets[0]);
					expect(actualResult[0].films.length).to.be.deep.equal(expectedResult.films.length);
				});
		});
		it('Residents should be in the response', () => {
			return doRequest(app, '{planetsByName(name:"Alderaan"){name,residents{name}}}')
				.checkOKResponse(({ planetsByName: actualResult }) => {
					expect(actualResult.length).to.be.deep.equals(1);
					const extractor = getFieldsExtractor('name', 'residents');
					const expectedResult = extractor(expectedPlanets[0]);
					expect(actualResult[0].residents.length).to.be.deep.equal(expectedResult.residents.length);
				});
		});
	});
});
