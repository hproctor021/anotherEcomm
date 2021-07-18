const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

router.post('/cart/products', async (req, res) => {
    // find cart, if already exists
    let cart;
    if( !req.session.cartId ){
        // if cart doesn't exist, create one
        cart = await cartsRepo.create({ items: [] });
        req.session.cartId = cart.id;

    } else {
        // if cart is found, get it from repo
        cart = await cartsRepo.getOne(req.session.cartId);
    }

    const existingtem = cart.items.find( item => item.id === req.body.productId )
        if( existingtem ){
            existingtem.quantity++;
        } else {
            cart.items.push({ id: req.body.productId, quantity: 1 })
        }

        await cartsRepo.update(cart.id, {
            items: cart.items
        });
        

    console.log(cart);
    res.send('Product added to cart');
})

module.exports = router;