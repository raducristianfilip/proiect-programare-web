const mongoose = require('mongoose');

(async () => {
  try {
    await mongoose.connect(`mongodb://${process.env.MUSER}:${process.env.MPASSWORD}@${process.env.MHOST}:${process.env.MPORT}/${process.env.MDATABASE}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  } catch (e) {
    console.trace(e);
  }
})();

const Authors = require('./models/Authors.js');
const Books = require('./models/Books.js');
const Users = require('./models/Users.js');
const Pizzas = require('./models/Pizzas.js');
const Questions = require('./models/Questions.js');

module.exports = {
  Authors,
  Books,
  Users,
  Pizzas,
  Questions
}