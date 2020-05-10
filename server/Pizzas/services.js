const {
	Pizzas,
} = require('../data');

var myCart = [];

const add = async (name, blat, toppings) => {
	const pizza = new Pizzas({
		name,
		blat,
		toppings
	});
	await pizza.save();
}

const getAll = async () => {
	return await Pizzas.find();
};

const getById = async (id) => {
	return await Pizzas.findById(id);
};

const updateById = async (id, name, blat, toppings) => {
    await Authors.findByIdAndUpdate(id, { name, blat, toppings });
};

const deleteById = async (id) => {
	await Pizzas.findByIdAndDelete(id);
}

const addToCart = async (id) => {
	await myCart.push(await Pizzas.findById(id));
}

const getCart = async () => {
	return myCart;
}

const removeFromCart = async (id) => {
	var new_cart = []
	myCart.forEach(element => {
			if(element._id != id){
				new_cart.push(element);
			}
	});
	myCart = [];
	myCart = new_cart;
}

const emptyCart = async () => {
	return myCart = [];
}

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
	addToCart,
	getCart,
	removeFromCart,
	emptyCart
}