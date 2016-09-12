'use strict';

import data from '../../data/species.json';
const species = data.sort(({name1}, {name2}) => name1 < name2 ? -1 : 1);

const speciesDB = {
	findAll() {
		return species;
	},

	findByUrl(url) {
		return species.find(species => species.url===url);
	}
};

export default speciesDB;
