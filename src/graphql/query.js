'use strict';

import {
	GraphQLObjectType
} from 'graphql';
import {
	filmsQuery,
	filmByIdQuery,
	filmsByTitleQuery
} from './types/films';
import {
	charactersQuery,
	characterByIdQuery,
	charactersByNameQuery
} from './types/characters';
import {
	speciesQuery,
	speciesByNameQuery,
	speciesByClassificationQuery,
	speciesByDesignationQuery,
	specieByIdQuery
} from './types/species';
import {
	planetsQuery,
	planetsByNameQuery,
	planetByIdQuery
} from './types/planets';
import {
	starshipsQuery,
	starshipsByNameQuery,
	starshipByIdQuery
} from './types/starships';
import {
	vehiclesQuery,
	vehicleByIdQuery,
	vehiclesByNameQuery
} from './types/vehicles';

export const query = new GraphQLObjectType({
	name: 'query',
	fields: {
		films: filmsQuery,
		filmById: filmByIdQuery,
		filmsByTitle: filmsByTitleQuery,
		characters: charactersQuery,
		characterById: characterByIdQuery,
		charactersByName: charactersByNameQuery,
		species: speciesQuery,
		specieById: specieByIdQuery,
		speciesByName: speciesByNameQuery,
		speciesByClassification: speciesByClassificationQuery,
		speciesByDesignation: speciesByDesignationQuery,
		planets: planetsQuery,
		planetById: planetByIdQuery,
		planetsByName: planetsByNameQuery,
		starships: starshipsQuery,
		starshipsByName: starshipsByNameQuery,
		starshipById: starshipByIdQuery,
		vehicles: vehiclesQuery,
		vehicleById: vehicleByIdQuery,
		vehiclesByName: vehiclesByNameQuery
	}
});
