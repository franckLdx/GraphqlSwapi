'use strict';

import { filmType, findByUrls as findFilms } from './films';
import { characterType, findByUrls as findCharacters } from './characters';
import { planetType, findByUrl as findPlanet } from './planets';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType
} from 'graphql';

export const classificationType = new GraphQLEnumType({
	name: 'classification',
	description: 'Species\' classification',
	values: {
		AMPHIBIAN: { value: 'amphibian' },
		ARTIFICIAL: { value: 'artificial' },
		GASTROPOD: { value: 'gastropod' },
		INSECTOID: { value: 'insectoid' },
		MAMMAL: { value: 'mammal' },
		REPTILE: { value: 'reptile' },
		REPTILIAN: { value: 'reptilian' },
		SENTIENT: { value: 'sentient' },
		UNKNOWN: { value: 'unknown' },
	}
});

export const designationType = new GraphQLEnumType({
	name: 'designation',
	values: {
		REPTILIAN: { value: 'reptilian' },
		SENTIENT: { value: 'sentient' },
	}
});


export const specieType = new GraphQLObjectType({
	name: 'species',
	description: 'A species within the Star Wars Universe.',
	fields: () => {
		return {
			name: {
				type: GraphQLString,
				description: 'The name of this species.'
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
			},
			homewolrd: {
				type: new GraphQLNonNull(new GraphQLList(planetType)),
				description: `A planet that this person was born on or inhabits.`,
				resolve: ({ homewolrd }, _, ctx) => findPlanet(planets, ctx)
			},
			characters: {
				type: new GraphQLList(characterType),
				description: 'Charactes that are a part of this species.',
				resolve: ({ characters }, _, ctx) => findCharacters(residents, ctx)
			},
			films: {
				type: new GraphQLList(filmType),
				description: 'Films that this species has appeared in',
				resolve: ({ films }, _, ctx) => findFilms(films, ctx)
			},
		};
	}
});

export const speciesQuery = {
	type: new GraphQLNonNull(new GraphQLList(specieType)),
	description: 'species list',
	resolve: (request, params, { speciesDB }) => {
		return speciesDB.findAll();
	}
};

export const speciesByNameQuery = {
	type: new GraphQLNonNull(new GraphQLList(specieType)),
	description: 'Species list with a given name (empty is no name matches)',
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="Ewok", will return all characters with Ewok in the name (search is not case senstive)'
		},
	},
	resolve: (context, { name }, { speciesDB }) => {
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return speciesDB.findByName(name);
	}
};

export const speciesByClassificationQuery = {
	type: new GraphQLNonNull(new GraphQLList(specieType)),
	description: 'species list of that classification (empty list if found no species)',
	args: {
		classification: {
			type: new GraphQLNonNull(classificationType),
			description: 'Classification to search for'
		},
	},
	resolve: (context, { classification }, { speciesDB }) => {
		return speciesDB.findByClassification(classification);
	}
};

export const speciesByDesignationQuery = {
	type: new GraphQLNonNull(new GraphQLList(specieType)),
	description: 'species list of that designation (empty list if found no species)',
	args: {
		designation: {
			type: new GraphQLNonNull(designationType),
			description: 'Designation to search for'
		},
	},
	resolve: (context, { designation }, { speciesDB }) => {
		return speciesDB.findByDesignation(designation);
	}
};

export const findByUrls = (urls, { speciesDB }) => speciesDB.findByUrls(urls);
