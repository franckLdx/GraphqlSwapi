# GraphqlSwapi
My personal implementation of http://swapi.co/ using Graphql

This GraphQL returns data about Star Wars, just like http://swapi.co/api/ does through a REST API.
Data are downloaded localy into json files from swapi. GraphQL queries simpy search into this data)

## Installation
Once the project cloned in your environment:
	npm install

## First start ever
* grunt getSwapiData - This download swapi data into local jons file
* npm start

## Other Starts
npm start is enough. Whenever you want to update your data, do a grunt getSwapiData and restart the server.


# API
## Film

Information about a film.

**fields:**
* title: The title of this film
* id: Episode number
* opening_crawl	The opening paragraphs at the beginning of this film
* characters: An array of characters that are in this film
* species: List of characters that are in this film
* planets: List of planets that are in this film
* starships: List of starships that in this film
* vehicles: List of vehicles that in this film
* director: The name of the director of this film
* producers: The name(s) of the producer(s) of this film
* release_date: The ISO 8601 date format of film release at original creator country

**Available queries:**
* films: Full films list,
* filmById: Return the film with the given id or null it there's no film for the episode,
* filmsByTitle: Returns films which has a given words or expression in is title (empty if no film matchs, search is not case sensitive)

## Character

A character within the Star Wars universe.

**fields:**
* name: The name of this person.
* birth_year: The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope
* eye_color: The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye
* gender: The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender
* hair_color: The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair
* height: The height of the person in centimeters
* mass: The mass of the person in kilograms
* skin_color: The skin color of this person
* homeworld: A planet that this person was born on or inhabits
* films: An array of film resource URLs that this person has been in
* species: Species that this person belonds to
* starships: Starships that this person had piloted
* vehicles: Vehicles that this person had piloted

**Queries**

* characters: Characters list,
* characterByName: Characters, searched by a name (empty is no characters match, search is not case sensitive),

## Planet:

Information about a planet

**Fields**:
* name: The name of this planet
* diameter: The diameter of this planet in kilometers
*	rotation_period: The number of standard hours it takes for this planet to complete a single rotation on its axis
* orbital_period: The number of standard days it takes for this planet to complete a single orbit of its local star
* gravity: A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs
*	population: The average population of sentient beings inhabiting this planet
*	climate: The climate(s) of this planet
* terrain: The terrain(s) of this planet
* surface_water: The percentage of the planet surface that is naturally occuring water or bodies of water
* residents: Characters that live on this planet (empty if no redident are known
* films: Films that this planet has appeared in

**Queries**

* planets: Planets list
* planetByName: List of the planet whith has a name that contains the given name (empty if no match, search is not case sensitive)
