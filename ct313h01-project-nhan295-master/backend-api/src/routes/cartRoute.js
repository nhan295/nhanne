const express = require('express')
const cartController = require('../controllers/cartController')

const router = express.Router()


module.exports.setup = (app) => {
    
    app.use('/api/v1/cart', router)

    // Add item to cart
/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     summary: Add item to cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Item added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error adding item to cart
 */
    router.post('/add', cartController.addCart);

    // Update cart item quantity
/**
 * @swagger
 * /api/v1/cart/update:
 *   put:
 *     summary: Update quantity of an item in the cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item quantity updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error updating cart item
 */
    router.put('/update', cartController.updateCart);

    // Delete item from cart
/**
 * @swagger
 * /api/v1/cart/delete:
 *   delete:
 *     summary: Delete item from cart
 *     tags:
 *       - Cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *               book_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cart item deleted successfully
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                     type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error deleting cart item
 */ 
    router.delete('/delete', cartController.deleteCart);

    // Get all items in the cart for a user
/**
 * @swagger
 * /api/v1/cart/{user_id}:
 *   get:
 *     summary: Get all items in the cart for a user
 *     tags:
 *       - Cart
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       book_id:
 *                         type: integer
 *                       quantity:
 *                         type: integer
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Error retrieving cart items
 */
    router.get('/:user_id', cartController.getCart);
};
