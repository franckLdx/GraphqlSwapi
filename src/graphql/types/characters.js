'use strict';

import charactersDB from '../../data/characters.js';
import filmsDB from '../../data/films.js';
import speciesDB from '../../data/species.js';


import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { filmType } from './films.js';
import { speciesType } from './species.js';

import { getFindByUrls } from '../tools.js';

export const characterType = new GraphQLObjectType({
	name: 'characters',
	description: 'A character within the Star Wars universe.',
	fields: () => { return {
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
				type: GraphQLString,
				description:'The URL of a planet resource, a planet that this person was born on or inhabits.'
			},
			films: {
				type: new GraphQLList(filmType),
				description : 'An array of film resource URLs that this person has been in.',
				resolve: ({films}) => {
					return films.map(url => filmsDB.findByUrl(url));
				}
			},
			species: {
				type: new GraphQLNonNull(new GraphQLList(speciesType)),
				description: 'Species that this person belonds to.',
				resolve: getFindByUrls(speciesDB, 'species')
			}
			//starships array -- An array of starship resource URLs that this person has piloted.
			//vehicles array -- An array of vehicle resource URLs that this person has piloted.
			//url string -- the hypermedia URL of this resource.
			//created string -- the ISO 8601 date format of the time that this resource was created.
			//edited string -- the ISO 8601 date format of the time that this resource was edited.
		};
	}
});

export const charactersQuery = {
	type: new GraphQLList(characterType),
	description: 'characters list',
	resolve: () => {
		return charactersDB.findAll();
	}
};

export const charactersByName = {
	type: characterType,
	description: 'A character, searched by it name',
	resolve: () => {
		return charactersDB.findbyName();
	}
};
