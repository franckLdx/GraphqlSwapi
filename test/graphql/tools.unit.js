'use strict';

import {getResolveStringToArray} from '../../src/graphql/tools.js';
import { expect } from 'chai';
import {describe, it} from 'mocha';

describe('Test of my Graphql tools box', function() {
	it('string does not exist: Should return an empty array', function() {
		const field = 'foo';
		const str2array = getResolveStringToArray(field);
		expect(str2array({}).length).to.be.deep.equal(0);
	});
	it('string is empty: should return an empty array', function() {
		const field = 'foo';
		const value = '';
		const str2array = getResolveStringToArray(field);
		expect(str2array({[field]:value})).to.be.deep.equal([value]);
	});
	it('string is full of spaces: should return an empty array', function() {
		const field = 'foo';
		const value = '  ';
		const str2array = getResolveStringToArray(field);
		expect(str2array({[field]:value})).to.be.deep.equal([value.trim()]);
	});
	it	('string contains a string: Should return an array with a the string', function() {
		const field = 'foo';
		const value = 'bar';
		const str2array = getResolveStringToArray(field);
		expect(str2array({[field]: value})).to.be.deep.equal([value]);
	});
	it('string a single word with a comma: Should return an array with the string', function() {
		const field = 'foo';
		const value1 = 'bar';
		const value2 = 'ba';
		const str2array = getResolveStringToArray(field);
		expect(str2array({[field]: `${value1},${value2}`})).to.be.deep.equal([value1, value2]);
	});
});
