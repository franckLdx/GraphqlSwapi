'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { characterType, findByUrls as findCharacters } from './characters';
import { filmType, findByUrls as findFilms } from './films';

export const planetType = new GraphQLObjectType({
	name: 'Planet',
	description: `Information about a planet`,
	fields: () => {
		return {
			id: {
				type: GraphQLString,
				description: 'Planet id.',
			}, name: {
				type: GraphQLString,
				description: 'The name of this planet.',
			},
			diameter: {
				type: GraphQLString,
				description: 'The diameter of this planet in kilometers.',
			},
			rotation_period: {
				type: GraphQLString,
				description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis.'
			},
			orbital_period: {
				type: GraphQLString,
				description: 'The number of standard days it takes for this planet to complete a single orbit of its local star.'
			},
			gravity: {
				type: GraphQLString,
				description: 'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.'
			},
			population: {
				type: GraphQLString,
				description: 'The average population of sentient beings inhabiting this planet.'
			},
			climate: {
				type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
				description: 'The climate(s) of this planet.'
			},
			terrain: {
				type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
				description: 'The terrain(s) of this planet.'
			},
			surface_water: {
				type: GraphQLString,
				description: 'The percentage of the planet surface that is naturally occuring water or bodies of water.'
			},
			residents: {
				type: new GraphQLNonNull(new GraphQLList(characterType)),
				description: 'Characters that live on this planet (empty if no redident are known).',
				resolve: ({ residents }, _, ctx) => findCharacters(residents, ctx)
			},
			films: {
				type: new GraphQLNonNull(new GraphQLList(filmType)),
				description: 'Films that this planet has appeared in.',
				resolve: ({ films }, _, ctx) => findFilms(films, ctx)
			}
		};
	}
});

export const planetsQuery = {
	type: new GraphQLNonNull(new GraphQLList(planetType)),
	description: 'Planets list',
	resolve: (request, params, { planetsDB }) => planetsDB.all()
};

export const planetsByNameQuery = {
	type: new GraphQLNonNull(new GraphQLList(planetType)),
	description: 'List of the planet whith has a name that contains the given name (empty if no match, search is not case sensitive)',
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'a full or partial planet name'
		}
	},
	resolve: (request, { name }, { planetsDB }) => {
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return planetsDB.filterByName(name);
	}
};

export const findByUrls = (urls, { planetsDB }) => planetsDB.findByUrls(urls);
export const findByUrl = (url, { planetsDB }) => {
	const planets = planetsDB.findByUrls(urls);
	return planets.length > 0 ? planets[0] : undefined;
};
