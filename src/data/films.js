'use strict';

import data from '../../data/films.json';

const films = data.sort((film1, film2) => film1.episode_id < film2.episode_id ? -1 : 1);

const filmsDB = {
	findAll() {
		return films;
	},

	findByid(id) {
		return films.find(film => film.episode_id===id);
	},

	findByTitle(title) {
		const searched = title.toLowerCase();
		return films.filter(film => film.title.toLowerCase().indexOf(searched)!==-1);
	},

	findByUrl(url) {
		return films.find(film => film.url===url);
	},

	count() {
		return films.length;
	}
};

export default filmsDB;
