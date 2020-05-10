const Router = require('express')();

const AuthorsController = require('../Authors/controllers.js');
const BooksController = require('../Books/controllers.js');
const UsersController = require('../Users/controllers.js');
const PizzasController = require('../Pizzas/controllers.js');
const QuestionsController = require('../Questions/controllers');

Router.use('/authors', AuthorsController);
Router.use('/books', BooksController);
Router.use('/users', UsersController);
Router.use('/pizzas', PizzasController);
Router.use('/questions', QuestionsController);

module.exports = Router;