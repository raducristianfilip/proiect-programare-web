const express = require('express');

const QuestionsService = require('./services.js');

const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');

const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();



router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        text
    } = req.body;

    // validare de campuri
    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            text: {
                value: text,
                type: 'ascii'
            }
        };
		
		validateFields(fieldsToBeValidated);

        await QuestionsService.add(name, text);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
        const questions = await QuestionsService.getAll();
        res.status(200).json(questions);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        // validare campuri
        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'ascii'
            }
        };

        validateFields(fieldsToBeValidated);
        // do logic
        const pizza = await PizzasService.getById(id);
        return res.status(200).json(pizza);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        name,
        text
    } = req.body;
    try {
        // validare param
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            blat: {
                value: blat,
                type: 'ascii'
            }
        };
		
		validateFields(fieldsToBeValidated);

        await QuestionsService.updateById(id, name, text);
        // do logic
        res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        if (err.message.includes('Cast to ObjectId failed')) {
            next(new ServerError(`Intrebarea cu id-ul ${id} nu exista in baza de date`, 404));
        }
        next(err);
    }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const fieldsToBeValidated = {
            id: {
                name: id,
                value: 'ascii'
            }
        }
        validateFields(fieldsToBeValidated);
        // do logic
        await QuestionsService.deleteById(id);
        return res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;