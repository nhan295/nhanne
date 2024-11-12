const db = require('../config/db');


//Model for cart 
const cartModel = {

    getCartData: (user_id) => {
        return db('CARTS').select('book_id', 'quantity').where({ user_id: user_id });
    },
    // Check if a cart item exists for a specific user and book
    getCartItem: (user_id, book_id) => {
        return db('CARTS').where({ user_id: user_id, book_id: book_id }).first();
    },
    
    addCart: async (user_id, book_id, quantity) => {
        const existingItem = await cartModel.getCartItem(user_id, book_id);

        if (existingItem) {
            // If item exists, update the quantity
            return cartModel.updateCartQuantity(user_id, book_id, quantity);
        } else {
            return db('CARTS').insert({
                user_id: user_id,
                book_id: book_id,
                quantity: quantity
            });
        }
    },
    // Update the quantity for an item in the cart (set to a specific value)
    updateCart: (user_id, book_id, quantity) => {
        return db('CARTS')
            .update({
                quantity: quantity
            })
            .where({
                user_id: user_id,
                book_id: book_id
            })
    },
    // Increment the quantity of an existing item in the cart by `add_quantity`
    updateCartQuantity: async (user_id, book_id, add_quantity) => {
        const item = await cartModel.getCartItem(user_id, book_id);

        if (!item) {
            throw new Error("Cart item not found.");
        }

        const newQuantity = item.quantity + add_quantity;

        return db('CARTS')
            .update({
                quantity: newQuantity
            })
            .where({
                user_id: user_id,
                book_id: book_id
            })
    },

    deleteCartItem: (user_id, book_id) => {
        return db('CARTS')
            .del()
            .where({
                user_id: user_id,
                book_id: book_id,
            })
    },

}

module.exports = cartModel;
