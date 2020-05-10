const express = require('express');

const UsersService = require('./services.js');
const {
    validateFields
} = require('../utils');

const router = express.Router();

router.get('/fk', async (req, res, next) => {
	try {

        const users = await UsersService.getAll();
        res.json(users);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    const {
        username,
        password,
		email
    } = req.body;

    // validare de campuri
    try {
        const fieldsToBeValidated = {
            username: {
                value: username,
                type: 'alpha'
            },
            password: {
                value: password,
                type: 'ascii'
            },
			email: {
				value: email,
				type: 'email'
			}
        };
        validateFields(fieldsToBeValidated);
        await UsersService.add(username, password, email);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
  const {
      login_choice,
      password
  } = req.body;
	console.log(req.body);
  try {
    const fieldsToBeValidated = {
        login_choice: {
            value: login_choice,
            type: 'login_option'
        },
        password: {
            value: password,
            type: 'ascii'
        }
    };

    validateFields(fieldsToBeValidated);

    const token = await UsersService.authenticate(login_choice, password);

    res.status(200).json(token);
} catch (err) {
    // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
    next(err);
}

})
module.exports = router;