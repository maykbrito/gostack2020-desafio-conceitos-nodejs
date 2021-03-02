const Router = require('express').Router;
const routesRepository = require('./repositories.routes');

const routes = Router();

routes.use('/repositories', routesRepository);

module.exports = routes;

