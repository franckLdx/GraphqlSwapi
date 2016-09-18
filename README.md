# GraphqlSwapi
My personal implementation of http://swapi.co/ using Graphql

## Installation
Once the project cloned in your environment:
	npm install

## First start ever
* grunt getSwapiData - This download swapi data into local jons file
* npm start

# Other Starts
npm start is enough. Whenever you want to update your data, do a grunt getSwapiData and restart the server.

# Overview
This GraphQL returns data about Star Wars, just like http://swapi.co/api/ does through a REST API.
Data are downloaded localy into json files from swapi. GraphQL queries simpy search into this data)

# API
## Films 

Information about a film.

fields: 
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
