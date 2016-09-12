'use strict';

import data from '../../data/people.json';
const characters = data.sort(({name1}, {name2}) => name1 < name2 ? -1 : 1);

const charactersDB = {
	findAll() {
		return characters;
	},

	findByUrl(url) {
		return characters.find(characters => characters.url===url);
	}
};

export default charactersDB;
