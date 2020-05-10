const {
	Questions,
} = require('../data');

const add = async (name, text) => {
	const question = new Questions({
		name,
		text
	});
	await question.save();
}

const getAll = async () => {
	return await Questions.find();
};

const getById = async (id) => {
	return await Questions.findById(id);
};

const updateById = async (id, name, text) => {
    await Questions.findByIdAndUpdate(id, { name, text });
};

const deleteById = async (id) => {
	await Questions.findByIdAndDelete(id);
}

module.exports = {
    add,
    getAll,
    getById,
    updateById,
    deleteById,
}