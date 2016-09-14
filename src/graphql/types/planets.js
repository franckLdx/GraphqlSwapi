'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import planetsDB from '../../data/planets';

export const planetType = new GraphQLObjectType({
	name: 'Planet',
  	description: `Information about a planet`,
  	fields: () => { return {
    	name: {
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
	} }
});

export const planetsQuery = {
	type: new GraphQLNonNull(new GraphQLList(planetType)),
	resolve: () => planetsDB.findAll()
};

export const findByUrls = urls => planetsDB.findByUrls(urls);
