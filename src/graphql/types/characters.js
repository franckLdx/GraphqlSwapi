'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { filmType, findByUrls as findFilms } from './films';
import { specieType, findByUrls as findSpecies } from './species';
import { planetType, findByUrls as findPlanets } from './planets';
import { starshipType, findByUrls as findStarships } from './starships';
import { vehicleType, findByUrls as findVehicles } from './vehicles';

export const characterType = new GraphQLObjectType({
	name: 'characters',
	description: 'A character within the Star Wars universe.',
	fields: () => {
		return {
			name: {
				type: GraphQLString,
				description: 'The name of this person.'
			},
			birth_year: {
				type: GraphQLString,
				description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.'
			},
			eye_color: {
				type: GraphQLString,
				description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.'
			},
			gender: {
				type: GraphQLString,
				description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.'
			},
			hair_color: {
				type: GraphQLString,
				description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.'
			},
			height: {
				type: GraphQLString,
				description: 'The height of the person in centimeters.'
			},
			mass: {
				type: GraphQLString,
				description: 'The mass of the person in kilograms.'
			},
			skin_color: {
				type: GraphQLString,
				description: 'The skin color of this person.'
			},
			homeworld: {
				type: planetType,
				description: 'A planet that this person was born on or inhabits.',
				resolve: ({ homeworld }) => {
					const planets = findPlanets([homeworld]);
					return planets.length ? planets[0] : undefined;
				}
			},
			films: {
				type: new GraphQLList(filmType),
				description: 'An array of film resource URLs that this person has been in.',
				resolve: ({ films }) => findFilms(films),
			},
			species: {
				type: new GraphQLNonNull(new GraphQLList(specieType)),
				description: 'Species that this person belonds to.',
				resolve: ({ species }) => findSpecies(species),
			},
			starships: {
				type: new GraphQLNonNull(new GraphQLList(starshipType)),
				description: 'Starships that this person had piloted.',
				resolve: ({ starships }) => findStarships(starships),
			},
			vehicles: {
				type: new GraphQLNonNull(new GraphQLList(vehicleType)),
				description: 'Vehicles that this person had piloted.',
				resolve: ({ vehicles }) => findVehicles(vehicles),
			}
		};
	}
});

export const charactersQuery = {
	type: new GraphQLNonNull(new GraphQLList(characterType)),
	description: 'Characters list',
	resolve: (_parentValue, _args, { charactersDB }) => {
		return charactersDB.findAll();
	}
};

export const charactersByNameQuery = {
	type: new GraphQLNonNull(new GraphQLList(characterType)),
	description: 'Characters, searched by a name (empty is no characters match)',
	args: {
		name: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="Luke", will return all characters with luke in the name (search is not case senstive)'
		},
	},
	resolve: (context, { name }, { charactersDB }) => {
		console.log(JSON.stringify(context));
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return charactersDB.findByName(name);
	}
};

export const findByUrls = (urls, { charactersDB }) => charactersDB.findByUrls(urls);
