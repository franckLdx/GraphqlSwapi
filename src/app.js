'use strict';

import express from 'express';

const graphQLMiddleware = require('./graphql/api.js').getmiddelware();

export const app = express();
app.use('/API/', graphQLMiddleware);
