const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PizzaSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	blat: {
		type: String,
		enum: ['normal', 'italian', 'crocant', 'cheesy'],
		default: 'normal'
	},
	toppings: [{
		type: String,
		enum: ['pui', 'vita', 'bacon', 'jalapeno', 'ciuperci', 'masline'],
		default: 'bacon'
	}]
}, { timestamps: true });

const PizzaModel = mongoose.model('Pizza', PizzaSchema);
module.exports = PizzaModel;