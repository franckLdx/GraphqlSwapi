'use strict';

import {stringToArray} from '../../src/tools/functions';
import {expect} from 'chai';
import {describe, it} from 'mocha';

describe('Test of my Graphql tools box', function() {
	describe('StringToArray test', function() {
		it('string does not exist: Should return an empty array', function() {
			expect(stringToArray().length).to.be.deep.equal(0);
		});
		it('string is empty: should return an empty array', function() {
			const value = '';
			expect(stringToArray(value)).to.be.deep.equal([value]);
		});
		it('string is full of spaces: should return an empty array', function() {
			const value = '  ';
			expect(stringToArray(value)).to.be.deep.equal([value.trim()]);
		});
		it	('string contains a string: Should return an array with a the string', function() {
			const value = 'bar';
			expect(stringToArray(value)).to.be.deep.equal([value]);
		});
		it('string a single word with a comma: Should return an array with the string', function() {
			const value1 = 'bar';
			const value2 = 'ba';
			expect(stringToArray(`${value1},${value2}`)).to.be.deep.equal([value1, value2]);
		});
	});
});
