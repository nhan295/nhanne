
const express = require('express')
const bookController = require('../controllers/bookController')

const router = express.Router()

module.exports.setup = (app) => {
    
    app.use('/api/v1/book', router)

    // Get user data api routes
    router.get('/:category', bookController.getBooksByCategory);

    router.get('/search/:name', bookController.searchBooksByName);

}
