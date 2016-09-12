'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { characterType } from './characters.js';
import { speciesType } from './species.js';

import filmsDB from '../data/films.js';
import charactersDB from '../data/characters.js';
import speciesDB from '../data/species.js';

import { getFindByUrls, getResolveStringToArray } from './tools.js';

export const filmType = new GraphQLObjectType({
	name: 'Film',
  	description: `Information about a film`,
  	fields: () => { return {
    	title: {
			type: GraphQLString,
			description: `The title of this film`
		},
    	id: {
      		type: GraphQLInt,
      		resolve: (film) => film.episode_id,
      		description:`Episode number`
    	},
    	opening_crawl: {
      		type: GraphQLString,
      		description:`The opening paragraphs at the beginning of this film`
    	},
    	characters: {
			type: new GraphQLNonNull(new GraphQLList(characterType)),
			description: 'An array of characters that are in this film',
			resolve: getFindByUrls(charactersDB, 'characters')
		},
		species: {
			type: new GraphQLNonNull(new GraphQLList(speciesType)),
			description: 'An array of characters that are in this film',
			resolve: getFindByUrls(speciesDB, 'species')
		},
		director: {
      		type: GraphQLString,
      		description: `The name of the director of this film`
    	},
    	producers: {
      		type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      		resolve: getResolveStringToArray('producer') ,
      		description: `The name(s) of the producer(s) of this film.`
		},
    	release_date: {
      		type: GraphQLString,
      		resolve: (film) => film.release_date,
      		description: `The ISO 8601 date format of film release at original creator country.`
    	},

    	//speciesConnection
    	//starshipConnection
    	//vehicleConnection
    	//characterConnection
    	//planetConnection
    	//created: createdField(),
    	//edited: editedField(),
	}},
});

export const filmsQuery = {
	type: new GraphQLList(filmType),
	resolve: () => {
		return filmsDB.findAll();
	}
};

export const filmByIdQuery = {
	type: filmType,
	description: 'Return the film with the given id or null it there\' no film for the episode',
	args: {
		id : {type: new GraphQLNonNull(GraphQLInt)},
	},
	resolve: (context, {id}) => {
		return filmsDB.findByid(id);
	}
};

export const filmsByTitleQuery = {
	type: new GraphQLNonNull(new GraphQLList(filmType)),
	description: 'Returns films which has a given words or expression in is title (empty if no film matchs)',
	args: {
		title : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If title="The", will return all films wiht the in the title (search is not case senstive)'
		},
	},
	resolve: (context, {title}) => {
		if (title.length > 2048) {
			throw new Error("Invalid id value");
		}
		return filmsDB.findByTitle(title);
	}
};
