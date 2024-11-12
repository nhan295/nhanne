// src/controllers/bookController.js
const Book = require('../models/bookModel');

const getBooksByCategory = async (req, res) => {
  const { category } = req.params;
  const detail= await Book.getBooksByCategory(category)

  if(detail) {
    res.json({message: detail})
  }
};


const searchBooksByName = async (req, res) => {
  try {
    const name = req.params.name;
    const books = await Book.searchBooksByName(name);
    res.json({ books });
  } catch (error) {
    res.status(500).json({ message: 'Error searching books', error });
  }
};

module.exports = {
  getBooksByCategory,
  searchBooksByName
}