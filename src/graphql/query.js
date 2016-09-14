'use strict';

import { GraphQLObjectType } from 'graphql';
import { filmsQuery, filmByIdQuery, filmsByTitleQuery } from './types/films.js';
import { charactersQuery, characterByNameQuery } from './types/characters.js';
import { speciesQuery, specieByNameQuery } from './types/species.js';

export const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		films: filmsQuery,
		filmById: filmByIdQuery,
		filmsByTitle: filmsByTitleQuery,
		characters: charactersQuery,
		characterByName: characterByNameQuery,
		species: speciesQuery,
		specieByName: specieByNameQuery
	}
});
