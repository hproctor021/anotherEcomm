const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const ProductsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
// middleware function

router.get('/admin/products', (req, res) => {

});


router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({}));
});

router.post('/admin/products/new', upload.single('image'), [ requireTitle, requirePrice ], async (req, res) => {
    // upload.single('image') is from multer documentation - image is the name of the 
    // property where the image is in the form to be submitted

    const errors = validationResult(req);

    if( !errors.isEmpty() ){
        return res.send(productsNewTemplate({ errors }));
    }

    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await ProductsRepo.create({ title, price, image });
    
    res.send('New product submitted')
})

module.exports = router;