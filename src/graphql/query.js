'use strict';

import { GraphQLObjectType } from 'graphql';
import { filmsQuery, filmByIdQuery, filmsByTitleQuery } from './types/films';
import { charactersQuery, characterByNameQuery } from './types/characters';
import { speciesQuery, specieByNameQuery, specieByClassificationQuery, specieByDesignationQuery } from './types/species';
import { planetsQuery } from './types/planets';

export const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		films: filmsQuery,
		filmById: filmByIdQuery,
		filmsByTitle: filmsByTitleQuery,
		characters: charactersQuery,
		characterByName: characterByNameQuery,
		species: speciesQuery,
		specieByName: specieByNameQuery,
		specieByClassification: specieByClassificationQuery,
		specieByDesignation: specieByDesignationQuery,
		planets: planetsQuery
	}
});
