'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType
} from 'graphql';

import speciesDB from '../../data/species.js';

export const classificationType = new GraphQLEnumType({
	name: 'classification',
	description: 'Species\' classification',
	values: {
		AMPHIBIEN: {value: 'amphibian'},
		ARTIFICIAL: {value: 'artificial'},
		GASTROPOD: {value: 'gastropod'},
		INSECTOID: {value: 'insectoid'},
		MAMMAL: {value: 'mammal'},
		REPTILE: {value: 'reptile'},
		REPTILIAN: {value: 'reptilian'},
		SENTINENT: {value: 'sentient'},
		UNKNOWN: {value: 'unknown'},
	}
});

export const designationType = new GraphQLEnumType({
	name: 'designation',
	values: {
		REPTILIAN: {value: 'reptilian'},
		SENTINENT: {value: 'sentient'},
	}
});


export const speciesType = new GraphQLObjectType({
	name: 'species',
	description: 'A  type of person or character within the Star Wars Universe.',
	fields: () => { return {
		name: {
			type: GraphQLString,
			description : 'The name of this species.'
		},
		classification: {
			type: classificationType,
			description: 'The classification of this species, such as "mammal" or "reptile".'
		},
		designation: {
			type: designationType,
			description: 'The designation of this species.'
		},
		average_height: {
			type: GraphQLString,
			description: 'The average height of this species in centimeters.'
		},
		average_lifespan: {
			type: GraphQLString,
			description: 'The average lifespan of this species in years.',
		},
		eye_colors: {
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			description: 'List of common eye colors for this species, empty if this species does not typically have eyes.',
		},
		hair_colors: {
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			description: 'List of common hair colors for this species, empty if this species does not typically have hair (or have no hair at all).',
		},
		skin_colors: {
			type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
			description: 'List of common skin colors for this species, empty if this species does not typically have skin.',
		},
		language: {
			type: GraphQLString,
			description: 'The language commonly spoken by this species.'
		},/*
		homeworld: {
			type: GraphQLString,
			description: 'The URL of a planet resource, a planet that this species originates from.'
		},
		characters: {
			type: new GraphQLList(charactersType),
			description: 'Charactes that are a part of this species.',
			resolve: () => { return ''; }
		},
		films: {
			type: new GraphQLList(filmsType),
			description: 'Films that this species has appeared in',
			resolve: () => { return ''; }
		},*/
	};}
});

export const speciesQuery = {
	type: new GraphQLNonNull(new GraphQLList(speciesType)),
	description: 'species list',
	resolve: () => {
		return speciesDB.findAll();
	}
};

export const findByUrls = urls => speciesDB.findByUrls(urls);
