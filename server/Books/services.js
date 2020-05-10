const {
    Books
} = require('../data');

const AuthorService = require('../Authors/services.js');

const {
    ServerError
} = require('../errors')

const add = async (name, authorId, genres) => {
    // create new Book obj
    // save it
    let author;
    try {
        author = await AuthorService.getById(authorId);
    } catch (error) {
        throw new ServerError(`autorul cu id-ul ${authorId}  nu exista`, 404);
    }

    // validare enum in serviciu
    //try {
    const book = new Books({
        author: author,
        name: name,
        genres: genres,
    });

    await book.save();
};

const getAll = async () => {
    // get all books
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
    const books = await Books.find().populate('author');
    return books.map(changeFormat)

};

const getById = async (id) => {
    // get book by id
    // populate 'author' field
    // modify output so author is made of 'author.firstName author.lastName'
    try {
        const book = await Books.findById(id).populate ('author');
        return changeFormat(book);
    } catch{
        throw new ServerError(`Cartea cu id-ul ${id} nu exista`, 404);
    }
};

const getByAuthorId = async (id) => {
    // get book by author id
    // modify output so author is made of 'author.firstName author.lastName'
    try {
        const books = await Books.find({ "author": id }).populate('author');
        return books.map(changeFormat);
    } catch{
        throw new ServerError(`Autorul cu id-ul ${id} nu exista`, 404);
    }
};

const updateById = async (id, name, authorId, genres) => {
    // update by id
    let author;
    try {
        author = await AuthorService.getById(authorId);
    } catch (error) {
        throw new ServerError(`autorul cu id-ul ${authorId}  nu exista`, 404);
    }

    await Books.findByIdAndUpdate(id, { author: author, name: name, genres: genres },
        { useFindAndModify: false, runValidators: true });

};

// const deleteByAuthorId = async (idAuthor) => {
	// try{
		// const books = await Books.find({ "author": idAuthor }).populate('author');
		// await Books.findByIdAndDelete(books._id, { useFindAndModify: false });
	// } catch (error) {
		// throw new ServerError(`Nu exista cartea cu autorul cu id-ul ${id}`, 404);
	// }
// }

const deleteById = async (id) => {
    // delete by id
    try {
        await Books.findByIdAndDelete(id, { useFindAndModify: false });
    } catch (error) {
        throw new ServerError(`Nu exista carteaaaaa cu id-ul ${id}`, 404);
    }
};

const changeFormat = (book) => {
    return {
        name: book.name, genres: book.genres, id: book._id,
        author: book.author.firstName + " " + book.author.lastName
    }
}
module.exports = {
    add,
    getAll,
    getById,
    getByAuthorId,
    updateById,
    deleteById
}
