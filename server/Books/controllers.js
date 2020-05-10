const express = require('express');

const BooksService = require('./services.js');
const {
    validateFields
} = require('../utils');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    ServerError
} = require('../errors');
const {
    authorizeRoles
} = require('../security/Roles');

const router = express.Router();

router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        authorId,
        genres
    } = req.body;
    try {
        // do logic
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            authorId: {
                value: authorId,
                type: 'ascii'
            }
        };
        genres.forEach(element => {
            fieldsToBeValidated.element = { value: element, type: 'alpha' }
        });

        validateFields(fieldsToBeValidated);
        await BooksService.add(name, authorId, genres);
        res.status(200).send();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message
        if (err.message.includes("is not a valid enum value for path")) {
            next(new ServerError(`${genres} include tipuri invalide`, 400));
        };
        next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
        const books = await BooksService.getAll();
        res.status(200).json(books);
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
        const book = await BooksService.getById(id);
        return res.status(200).json(book);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const fieldsToBeValidated = {
            id: {
                value: id,
                type: 'ascii'
            }
        }
        validateFields(fieldsToBeValidated);
        // do logic
        const books = await BooksService.getByAuthorId(id);
        return res.status(200).json(books);
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
        authorId,
        genres
    } = req.body;
    try {
        // validare param
        let fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            authorId: {
                value: authorId,
                type: 'ascii'
            },
            id: {
                value: id,
                types: 'ascii'
            }
        };
        genres.forEach(element => {
            fieldsToBeValidated.element = { value: element, type: 'alpha' }
        });
        validateFields(fieldsToBeValidated);
        // do logic
        await BooksService.updateById(id, name, authorId, genres);
        res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        if (err.message.includes("is not a valid enum value for path")) {
            next(new ServerError(`${genres} include tipuri invalide`, 400));
        };
        if (err.message.includes('Cast to ObjectId failed')) {
            next(new ServerError(`Cartea cu id-ul ${id} nu exista in baza de date`, 404));
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
        await BooksService.deleteById(id);
        return res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

// router.delete('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    // const {
        // id
    // } = req.params;
    // try {
        // const fieldsToBeValidated = {
            // id: {
                // name: id,
                // value: 'ascii'
            // }
        // }
        // validateFields(fieldsToBeValidated);
        //do logic
        // await BooksService.deleteByAuthorId(id);
        // return res.status(200).end();
    // } catch (err) {
        //daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        // next(err);
    // }
// });


module.exports = router;
