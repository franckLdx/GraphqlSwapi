'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';

import jsonFilms from '../../../data/films.json';
import { createApp } from '../../../src/app.js';

import { getFieldsExtractor, doRequest } from './tools';

const expectedFilms =
	jsonFilms
		.map((film) => {
			const result = Object.create(film);
			result.id = film.episode_id;
			delete result.episode_id;
			result.producers = film.producer.split(',').map(s => s.trim());
			return result;
		}).sort((film1, film2) => {
			return film1.id < film2.id ? -1 : 1;
		});

let app;
describe('Films tests suite', function () {
	before(async function () {
		app = await createApp();
	});
	describe('Films list tests suite', function () {
		it('Films list should be in episode order (starting from The Phantom Menace) along with valid data', function () {
			return doRequest(app, '{films{id,title,opening_crawl,director,producers,release_date}}')
				.checkOKResponse(({ films: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'title', 'opening_crawl', 'director', 'producers', 'release_date');
					const expectedResult = expectedFilms.map(extractor);
					expect(actualResult).to.be.deep.equal(expectedResult);
				});
		});
	});
	describe('Films by episode id tests suite', function () {
		it('Should get the wanted episode', function () {
			return doRequest(app, '{filmById(id:5){id,title,opening_crawl,director,producers,release_date}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'title', 'opening_crawl', 'director', 'producers', 'release_date');
					const expectedResult = extractor(expectedFilms[4]);
					expect(actualResult).to.be.deep.equal(expectedResult);
				});
		});
		it('Use a non existing episode id, should get a null response', function () {
			return doRequest(app, '{filmById(id:10000){id,title,opening_crawl,director,producers,release_date}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					expect(actualResult).to.be.null;
				});
		});
	});
	describe('Films by title test suite', function () {
		it('Should get a film based on his title', function () {
			return doRequest(app, '{filmsByTitle(title:"the phantom menace"){id,title,opening_crawl, director,producers,release_date}}')
				.checkOKResponse(({ filmsByTitle: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('id', 'title', 'opening_crawl', 'director', 'producers', 'release_date');
					const expectedResult = extractor(expectedFilms[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get a film based on an extract of his title', function () {
			return doRequest(app, '{filmsByTitle(title:"phantom menace"){id,title,opening_crawl, director,producers,release_date}}')
				.checkOKResponse(({ filmsByTitle: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(1);
					const extractor = getFieldsExtractor('id', 'title', 'opening_crawl', 'director', 'producers', 'release_date');
					const expectedResult = extractor(expectedFilms[0]);
					expect(actualResult[0]).to.be.deep.equal(expectedResult);
				});
		});
		it('Should get an empty list when ask for a dummy title', function () {
			return doRequest(app, '{filmsByTitle(title:"donald vador"){id,title,opening_crawl, director,producers,release_date}}')
				.checkOKResponse(({ filmsByTitle: actualResult }) => {
					expect(actualResult.length).to.be.deep.equal(0);
				});
		});
		it('Should get an error when providing an invalid title', function () {
			return doRequest(app, '{filmsByTitle(title:"123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"){id,title,opening_crawl, director,producers,release_date}}')
				.expect(500)
				.expect((response) => {
					expect(response.body.data).to.be.null;
					expect(response.body.errors).not.to.be.undefined;
				});
		});
	});
	describe('Related types should be in the response', function () {
		it('Characters should be in the response', function () {
			return doRequest(app, '{filmById(id:5){id,title,characters{name}}}')
				.expect(200)
				.expect((response) => {
					const extractor = getFieldsExtractor('id', 'title', 'characters');
					const expectedResult = extractor(expectedFilms[4]);
					const actualFilms = response.body.data.filmById;
					expect(actualFilms.id).to.be.deep.equal(expectedResult.id);
					expect(actualFilms.title).to.be.deep.equal(expectedResult.title); expect(actualFilms.characters.length).to.be.deep.equal(expectedResult.characters.length);
					expect(response.body.errors).to.be.undefined;
				});
		});
		it('Species should be in the response', function () {
			return doRequest(app, '{filmById(id:5){id,title,species{name}}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'title', 'species');
					const expectedResult = extractor(expectedFilms[4]);
					expect(actualResult.id).to.be.deep.equal(expectedResult.id);
					expect(actualResult.title).to.be.deep.equal(expectedResult.title); expect(actualResult.species.length).to.be.deep.equal(expectedResult.species.length);
				});
		});
		it('Starships should be in the response', function () {
			return doRequest(app, '{filmById(id:5){id,starships{name}}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'starships');
					const expectedResult = extractor(expectedFilms[4]);
					expect(actualResult.id).to.be.deep.equal(expectedResult.id);
					expect(actualResult.starships.length).to.be.deep.equal(expectedResult.starships.length);
				});
		});
		it('Vehicles should be in the response', function () {
			return doRequest(app, '{filmById(id:5){id,vehicles{name}}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'vehicles');
					const expectedResult = extractor(expectedFilms[4]);
					expect(actualResult.id).to.be.deep.equal(expectedResult.id);
					expect(actualResult.vehicles.length).to.be.deep.equal(expectedResult.vehicles.length);
				});
		});
		it('Planets should be in the response', function () {
			return doRequest(app, '{filmById(id:5){id,planets{name}}}')
				.checkOKResponse(({ filmById: actualResult }) => {
					const extractor = getFieldsExtractor('id', 'planets');
					const expectedResult = extractor(expectedFilms[4]);
					expect(actualResult.id).to.be.deep.equal(expectedResult.id);
					expect(actualResult.planets.length).to.be.deep.equal(expectedResult.planets.length);
				});
		});
	});
});
