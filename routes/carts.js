const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

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
        
    res.redirect('/cart');
});

router.get('/cart', async (req, res) => {
    // if no cart yet made, redirect
    if( !req.session.cartId ){
        return res.redirect('/')
    }
    // connect user to cart
    const cart = await cartsRepo.getOne(req.session.cartId);

    for( let item of cart.items){
        const product = await productsRepo.getOne(item.id);

        item.product = product;
    }

    res.send(cartShowTemplate({ items: cart.items }));
});

router.post('/cart/products/delete', async (req, res) => {
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);

    const items = cart.items.filter(item => item.id !== itemId);

    await cartsRepo.update(req.session.cartId, { items });

    res.redirect('/cart');
});


module.exports = router;