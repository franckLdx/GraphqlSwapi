'use strict';

export function stringToArray(string, separator=',') {
	if (!string) {
		return [];
	}
    return string
		.split(separator)
		.map(s => s.trim());
}

export function getStringToArray(fieldName, separator=',') {
	return obj => stringToArray(obj[fieldName], separator);
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
