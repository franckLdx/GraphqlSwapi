'use strict';

import { GraphQLObjectType } from 'graphql';
import { filmsQuery, filmByIdQuery, filmsByTitleQuery } from './types/films';
import { charactersQuery, charactersByNameQuery } from './types/characters';
import { speciesQuery, speciesByNameQuery, speciesByClassificationQuery, speciesByDesignationQuery } from './types/species';
import { planetsQuery, planetsByNameQuery } from './types/planets';
import { starshipsQuery, starshipsByNameQuery } from './types/starships';
import { vehiclesQuery, vehiclesByNameQuery } from './types/vehicles';

export const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		films: filmsQuery,
		filmById: filmByIdQuery,
		filmsByTitle: filmsByTitleQuery,
		characters: charactersQuery,
		charactersByName: charactersByNameQuery,
		species: speciesQuery,
		speciesByName: speciesByNameQuery,
		speciesByClassification: speciesByClassificationQuery,
		speciesByDesignation: speciesByDesignationQuery,
		planets: planetsQuery,
		planetsByName: planetsByNameQuery,
		starships: starshipsQuery,
		starshipsByName: starshipsByNameQuery,
		vehicles: vehiclesQuery,
		vehiclesByName: vehiclesByNameQuery
	}
});
