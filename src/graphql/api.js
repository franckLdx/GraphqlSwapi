'use strict';

import expressGraphQl from 'express-graphql';

import {GraphQLSchema} from 'graphql';

import {query} from './query';

const schema = new GraphQLSchema({
	query
});

module.exports.getmiddelware = () => expressGraphQl({schema, pretty: true});
