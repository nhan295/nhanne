const cartModel = require('../models/cartModel');

// get all carts
const getAllCarts = async (req, res) => {
    try {
        const carts = await cartModel.getAllCarts();
        res.json({ data: carts });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving carts', error: error.message });
    }
};

// add item to cart
const addCart = async (req, res) => {
    try {
        const { user_id, book_id, quantity } = req.body;
        
        //input invalid
        if (!user_id || !book_id || !quantity) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        //input exist
        const existCart = await cartModel.getCartItem(user_id, book_id);

        if (existCart) {
            await cartModel.updateCartQuantity(user_id, book_id, quantity);
            return res.status(200).json({ message: 'Item quantity updated in cart' });
        } else {
            await cartModel.addCart(user_id, book_id, quantity);
            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding item to cart', error: error.message });
    }
};

// get a user's cart
const getCart = async (req, res) => {
    const { user_id } = req.params;
    
    try {
        // input valid
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Retrieve all items in the user's cart
        const cartItems = await cartModel.getCartData(user_id);

        if (!cartItems || cartItems.length == 0) {
            return res.status(404).json({ message: 'Cart not found for the user' });
        } 

        // Return the cart items
        return res.status(200).json({ data: cartItems });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error retrieving cart items', error: error.message });
    }
};

// update cart
const updateCart = async (req, res) => {
    try {
        const { user_id, book_id, quantity } = req.body;

        // Validate input
        if (!user_id || !book_id || !Number.isInteger(quantity)) {
            return res.status(400).json({ message: 'Missing or invalid required fields' });
        }

        // Check if the item exists in the cart
        const existingItem = await cartModel.getCartItem(user_id, book_id);

        if (existingItem) {
            // If it exists, update the quantity to the specified amount
            await cartModel.updateCart(user_id, book_id, quantity);
            return res.status(200).json({ message: 'Cart item quantity updated successfully' });
        } else {
            return res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error updating cart item', error: error.message });
    }
};

// delete item from cart
const deleteCart = async (req, res) => {
    try {
        const { user_id, book_id } = req.body;

        // Validate input
        if (!user_id || !book_id) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if the item exists in the cart
        const existCartItem = await cartModel.getCartItem(user_id, book_id);
        if (!existCartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Delete the item from the cart
        await cartModel.deleteCartItem(user_id, book_id);
        return res.status(200).json({ message: 'Item deleted from cart successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting item from cart', error: error.message });
    }
};



module.exports = {
    getAllCarts,
    addCart,
    getCart,
    updateCart,
    deleteCart
}