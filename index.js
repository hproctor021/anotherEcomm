const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
// third party library used to handle cookies

const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');


const app = express();

app.use(express.static('public'));
// now every request that is made. Now it is handled first by this middelware - 
// it will look at the route of the incoming request and see if there is a file in the public dorectory
// that matches the request route
// if there is no match, express will continue on to line 15

app.use(bodyParser.urlencoded({ extended: true }));
// will be applied to all route handlers by placing in app.use()
app.use(
    cookieSession({
    keys: ['ajlbgaw398runfs']
    // keys is used to encrypt all of the information stored inside of the cookie
    })
);

app.use(authRouter);
app.use(productsRouter);
app.use(adminProductsRouter);
app.use(cartsRouter);

app.listen(3000, () => {
    console.log('Listening');
});
// lets us know that our server is up & running 