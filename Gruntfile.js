'use strict';

const config = {
	srcDir : './src',
	testDir: './test',
	swapiData: './data',
	coverageDir: './coverage'
};

module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-swapi2json');

	grunt.initConfig({});

	grunt.config('clean', {
		test: config.coverageDir,
		swapi: config.swapiData
	});

	grunt.config('swapi2json', {
  		all: {
			dir: config.swapiData
		},
  	});

	grunt.config('swapi2json', {
  		all: {
			dir: config.swapiData
		},
  	});

	grunt.registerTask('getSwapiData', ['clean::swapi', 'swapi2json']);
	grunt.registerTask('default', ['getSwapiData']);
};
