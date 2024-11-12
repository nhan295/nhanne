const db = require('../config/db');

const bookModel = {
  getBooksByCategory: (category) => {
    return db('book').select('book.book_title','book.book_image','book.book_price','book.book_discount').innerJoin('book_types', 'book.type_id', 'book_types.type_id').where('book_types.type_name', `${category}`)
  },
  searchBooksByName: (name) => {
    return db('book')
      .select('book.book_title','book.book_image','book.book_price','book.book_discount')
      .where('book_title', 'like', `%${name}%`).limit(4); 
  },
};

module.exports = bookModel;

