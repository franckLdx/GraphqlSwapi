'use strict';

export function getSorter(field) {
	return (item1, item2) => {
		let ret = 0;
		if (item1[field] < item2[field]) {
			ret =-1;
		} else if (item1[field] > item2[field]) {
			ret =1;
		}
		return ret;
	};
}

export function stringToArray(string, separator=',') {
	if (string === undefined || string === null) {
		return [];
	}
    return string
		.trim() // Something like '   ' must processed as ''
		.split(separator)
		.map(s => s.trim());
}
