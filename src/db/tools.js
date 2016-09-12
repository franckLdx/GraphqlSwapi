'use strict';

export function stringToArray(string, separator=',') {
	if (string === undefined || string === null) {
		return [];
	}
    return string
		.trim() // Something like '   ' must processed as ''
		.split(separator)
		.map(s => s.trim());
}
