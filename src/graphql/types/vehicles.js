'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { filmType, filterByIds as findFilms } from './films';
import { characterType, filterByIds as findCharacters } from './characters';

export const vehicleType = new GraphQLObjectType({
	name: 'vehicles',
	description: 'A vehicle within the Star Wars universe.',
	fields: () => {
		return {
			id: {
				type: GraphQLString,
				description: 'Vehicle id.'
			},
			name: {
				type: GraphQLString,
				description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".'
			},
			model: {
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
			},
			films: {
				type: new GraphQLList(filmType),
				description: 'Films that this starships has appeared in',
				resolve: ({ films }, _, ctx) => findFilms(films, ctx)
			},
			pilots: {
				type: new GraphQLList(characterType),
				description: 'Pilot this vehicle has been piloted by.',
				resolve: ({ pilots }, _, ctx) => findCharacters(pilots, ctx)
			}
		};
	}
});

export const vehiclesQuery = {
	type: new GraphQLNonNull(new GraphQLList(vehicleType)),
	description: 'Vehicles list',
	resolve: (request, param, { vehiclesDB }) => vehiclesDB.all()
};

export const vehicleByIdQuery = {
	type: vehicleType,
	description: 'Vehcile, searched by an id (empty is no characters match)',
	args: {
		id: {
			type: new GraphQLNonNull(GraphQLString),
		},
	},
	resolve(context, { id }, { vehiclesDB }) {
		if (id.length > 2048) {
			throw new Error("Invalid id value");
		}
		return vehiclesDB.getById(id);
	}
}

export const vehiclesByNameQuery = {
	type: new GraphQLNonNull(new GraphQLList(vehicleType)),
	description: 'Vehicles, searched by a name (empty is no vehicles match)',
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="speeder", will return all vehicles with speeder in the name (search is not case senstive)'
		},
	},
	resolve: (context, { name }, { vehiclesDB }) => {
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return vehiclesDB.filterByName(name);
	}
};


export const filterByIds = (ids, { vehiclesDB }) =>
	vehiclesDB.filterByIds(ids);