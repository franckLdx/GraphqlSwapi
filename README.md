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
To query a GraphQL API, one can use either get or post. Even if it's less 'HTTP way', I prefer to use post
in my examples because queries content are more readable. Do to so we must set our content type to ['application/graphql'](./doc/content-type.png)

## Film

Information about a film.

**Fields:**
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
* films: Full films list [Example1](./doc/films1.png), [Example2, films with characters name](./doc/films2.png)
* filmById: Return the film with the given id or null it there's no film for the episode
Param name: id, an integer [Example](./doc/filmById.png)
* filmsByTitle: Returns films which has a given words or expression in is title (empty if no film matchs, search is not case sensitive). Param name: title, a string [Example](./doc/filmsByTitle.png)

## Character

A character within the Star Wars universe.

**Fields:**
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

## Specie

Species within the Star Wars Universe.

**Fields**
* name: The name of this species
* classification: The classification of this species, such as "mammal" or "reptile"
* designation The designation of this species
* average_height: The average height of this species in centimeters
* average_lifespan: The average lifespan of this species in years
* eye_colors: List of common eye colors for this species, empty if this species does not typically have eyes
* hair_colors List of common hair colors for this species, empty if this species does not typically have hair (or have no hair at all)
* skin_colors: List of common skin colors for this species, empty if this species does not typically have skin
* language: The language commonly spoken by this species


**Queries**
* species: Species list
* specieByName: Species list with a given name (empty is no name matches)
* specieByClassification: If name="Ewok", will return all characters with Ewok in the name (search is not case senstive)
* specieByDesignation: species list of that designation (empty list if found no species)

## Starship
A starship within the Star Wars Universe

**Fields**
* name: The name of this starship. The common name, such as "Death Star"
* model: The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station
* starship_class: The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation."
* manufacturer:	The manufacturer of this starship. Comma seperated if more than one.
* cost_in_credits: The cost of this starship new, in galactic credits
* length: The length of this starship in meters
* crew The number of personnel needed to run or pilot this starship
* passengers: The number of non-essential people this starship can transport
* max_atmosphering_speed:	The maximum speed of this starship in atmosphere. "N/A" if this starship is incapable of atmosphering flight
* hyperdrive_rating: The class of this starships hyperdrive
* MGLT:	The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth
* cargo_capacity: The maximum number of kilograms that this starship can transport
* consumables: The maximum length of time that this starship can provide consumables for its entire crew without having to resupply

**Queries**
* starships: Starships list
* starshipByName: List of the starships whith has a name that contains the given name (empty if no match, search is not case sensitive)

## Vehicle

A vehicle within the Star Wars universe

**Fields**
* name: The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike"
* model: The model or official name of this vehicle. Such as "All-Terrain Attack Transport
* vehicle_class: The class of this vehicle, such as "Wheeled" or "Repulsorcraft
* manufacturer: The manufacturer of this vehicle. Comma-seperated if more than one
* length: The length of this vehicle in meters
* cost_in_credits: The cost of this vehicle new, in Galactic Credits
* crew: The number of personnel needed to run or pilot this vehicle
* passengers: The number of non-essential people this vehicle can transport
* max_atmosphering_speed: The maximum speed of this vehicle in atmosphere
* cargo_capacity:	The maximum number of kilograms that this vehicle can transport
* consumables: The maximum number of kilograms that this vehicle can transport

**Queries**
* vehicles: Vehicles list,
* vehicleByName: Vehicles, searched by a name (empty is no vehicles match, search is not case sensitive)
