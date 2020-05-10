const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema ({
	name: {
		type: String,
		required: true
	},
	text: {
		type: String,
		required: true
	}
}, { timestamps: true });

const QuestionModel = mongoose.model('Question', QuestionSchema);
module.exports = QuestionModel;