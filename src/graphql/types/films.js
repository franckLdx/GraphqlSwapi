'use strict';

import {
	GraphQLObjectType,
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull
} from 'graphql';

import { characterType, findByUrls as findCharacters } from './characters';
import { specieType, findByUrls as findSpecies } from './species';
import { starshipType, findByUrls as findStarships } from './starships';
import { vehicleType, findByUrls as findVehicles } from './vehicles';
import { planetType, findByUrls as findPlanets } from './planets';

export const filmType = new GraphQLObjectType({
	name: 'Film',
	description: `Information about a film`,
	fields: () => {
		return {
			title: {
				type: GraphQLString,
				description: `The title of this film`
			},
			id: {
				type: GraphQLInt,
				description: `Episode number`
			},
			opening_crawl: {
				type: GraphQLString,
				description: `The opening paragraphs at the beginning of this film`
			},
			characters: {
				type: new GraphQLNonNull(new GraphQLList(characterType)),
				description: 'An array of characters that are in this film',
				resolve: ({ characters }, _, ctx) => findCharacters(characters, ctx)
			},
			species: {
				type: new GraphQLNonNull(new GraphQLList(specieType)),
				description: 'List of characters that are in this film',
				resolve: ({ species }, _, ctx) => findSpecies(species, ctx)
			},
			planets: {
				type: new GraphQLNonNull(new GraphQLList(planetType)),
				description: `List of planets that are in this film.`,
				resolve: ({ planets }, _, ctx) => findPlanets(planets, ctx)
			},
			starships: {
				type: new GraphQLNonNull(new GraphQLList(starshipType)),
				description: `List of starships that in this film.`,
				resolve: ({ starships }, _, ctx) => findStarships(starships, ctx)
			},
			vehicles: {
				type: new GraphQLNonNull(new GraphQLList(vehicleType)),
				description: `List of vehicles that in this film.`,
				resolve: ({ vehicles }, _, ctx) => findVehicles(vehicles, ctx)
			},
			director: {
				type: GraphQLString,
				description: `The name of the director of this film`
			},
			producers: {
				type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
				description: `The name(s) of the producer(s) of this film.`
			},
			release_date: {
				type: GraphQLString,
				description: `The ISO 8601 date format of film release at original creator country.`
			}
		};
	}
});

export const filmsQuery = {
	type: new GraphQLNonNull(new GraphQLList(filmType)),
	resolve: (_parentValue, _args, { filmsDB }) => filmsDB.findAll()
};

export const filmByIdQuery = {
	type: filmType,
	description: 'Return the film with the given id or null it there\'s no film for the episode',
	args: {
		id: { type: new GraphQLNonNull(GraphQLInt) },
	},
	resolve: (context, { id }, { filmsDB }) => filmsDB.findById(id)
};

export const filmsByTitleQuery = {
	type: new GraphQLNonNull(new GraphQLList(filmType)),
	description: 'Returns films which has a given words or expression in is title (empty if no film matchs)',
	args: {
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If title="The", will return all films wiht the in the title (search is not case senstive)'
		},
	},
	resolve: (context, { title }, { filmsDB }) => {
		if (title.length > 2048) {
			throw new Error("Invalid id value");
		}
		return filmsDB.findByTitle(title);
	}
};

export const findByUrls = (urls, { filmsDB }) => filmsDB.findByUrls(urls);
