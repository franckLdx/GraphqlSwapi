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

export function getResolveStringToArray(fieldName, separator=',') {
	return (object) => {
		return stringToArray(object[fieldName], separator);
	};
}

export function findByUrls(db, object, fieldName='url') {
	return object[fieldName].map(url => db.findByUrl(url));
}

export function getFindByUrls(db, fieldName='url') {
	return (object) => findByUrls(db, object, fieldName);
}
