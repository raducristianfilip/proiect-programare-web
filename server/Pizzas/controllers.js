const express = require('express');

const PizzasService = require('./services.js');

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

router.post('/cart/:id', async (req, res, next) => {
    console.log(req);
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
        await PizzasService.addToCart(id);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.delete('/cart/:id', async (req, res, next) => {
	//console.log(req);
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
		console.log(id);
        await PizzasService.removeFromCart(id);
        return res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.delete('/cart', async (req, res, next) => {
	try{
        // do logic
        await PizzasService.emptyCart();
        return res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/cart', async (req, res, next) => {
    try {
        // do logic
        const pizzas = await PizzasService.getCart();
        res.status(200).json(pizzas);
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});



router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        name,
        blat,
		toppings
    } = req.body;

    // validare de campuri
    try {

        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'ascii'
            },
            blat: {
                value: blat,
                type: 'alpha'
            }
        };
		toppings.forEach(element => {
			fieldsToBeValidated.element = { value: element, type: 'alpha' }
		});
		
		validateFields(fieldsToBeValidated);

        await PizzasService.add(name, blat, toppings);

        res.status(201).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin', 'user'), async (req, res, next) => {
    try {
        // do logic
        const pizzas = await PizzasService.getAll();
        res.status(200).json(pizzas);
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
        blat,
        toppings
    } = req.body;
    try {
        // validare param
        const fieldsToBeValidated = {
            name: {
                value: name,
                type: 'alpha'
            },
            blat: {
                value: blat,
                type: 'alpha'
            }
        };
		toppings.forEach(element => {
			fieldsToBeValidated.element = { value: element, type: 'alpha' }
		});
		
		validateFields(fieldsToBeValidated);

        await PizzasService.updateById(id, name, blat, toppings);
        // do logic
        res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 

        // pot sa primesc eroare si ca genul nu e bun, trebuie verificat mesajul erorii
        // HINT err.message 
        if (err.message.includes("is not a valid enum value for path")) {
            next(new ServerError(`${toppings} include tipuri invalide`, 400));
        };
        if (err.message.includes('Cast to ObjectId failed')) {
            next(new ServerError(`Pizza cu id-ul ${id} nu exista in baza de date`, 404));
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
        await PizzasService.deleteById(id);
        return res.status(200).end();
    } catch (err) {
        // daca primesc eroare, pasez eroarea mai departe la handler-ul de errori declarat ca middleware in start.js 
        next(err);
    }
});

module.exports = router;