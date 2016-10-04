'use strict';

import vehiclesDB from '../../data/vehicles.js';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

export const vehicleType = new GraphQLObjectType({
	name: 'vehicles',
	description: 'A vehicle within the Star Wars universe.',
	fields: () => {
		return {
			name: {
				type: GraphQLString,
				description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".'
			},
			model : {
				type: GraphQLString,
				description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport."'
			},
			vehicle_class: {
				type: GraphQLString,
				description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft."'
			},
			manufacturer: {
				type: GraphQLString,
				description: 'The manufacturer of this vehicle. Comma-seperated if more than one.'
			},
			length: {
				type: GraphQLString,
				description: 'The length of this vehicle in meters.'
			},
			cost_in_credits: {
				type: GraphQLString,
				description: 'The cost of this vehicle new, in Galactic Credits.'
			},
			crew: {
				type: GraphQLString,
				description: 'The number of personnel needed to run or pilot this vehicle.'
			},
			passengers: {
				type: GraphQLString,
				description: 'The number of non-essential people this vehicle can transport.'
			},
			max_atmosphering_speed: {
				type: GraphQLString,
				description: 'The maximum speed of this vehicle in atmosphere.'
			},
			cargo_capacity: {
				type: GraphQLString,
				description: 'The maximum number of kilograms that this vehicle can transport.'
			},
			consumables: {
				type: GraphQLString,
				description: 'The maximum number of kilograms that this vehicle can transport.'
			}
		};
	}
});

export const vehiclesQuery = {
	type: new GraphQLNonNull(new GraphQLList(vehicleType)),
	description: 'Vehicles list',
	resolve: () => vehiclesDB.findAll()
};

export const vehiclesByNameQuery = {
	type: new GraphQLNonNull(new GraphQLList(vehicleType)),
	description: 'Vehicles, searched by a name (empty is no vehicles match)',
	args: {
		name : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="speeder", will return all vehicles with speeder in the name (search is not case senstive)'
		},
	},
	resolve: (context, {name}) => {
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return vehiclesDB.findByName(name);
	}
};

export const findByUrls = urls => vehiclesDB.findByUrls(urls);
