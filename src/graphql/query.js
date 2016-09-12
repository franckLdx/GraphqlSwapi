'use strict';

import { GraphQLObjectType } from 'graphql';
import { filmsQuery, filmByIdQuery, filmsByTitleQuery } from './films.js';
import { charactersQuery } from './characters.js';
import { speciesQuery } from './species.js';

export const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		films: filmsQuery,
		filmById: filmByIdQuery,
		filmsByTitle: filmsByTitleQuery,
		characters: charactersQuery,
		species: speciesQuery,
	}
});
