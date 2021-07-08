const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/admin/auth');
const cookieSession = require('cookie-session');
// third party library used to handle cookies

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// will be applied to all route handlers by placing in app.use()
app.use(
    cookieSession({
    keys: ['ajlbgaw398runfs']
    // keys is used to encrypt all of the information stored inside of the cookie
    })
);

app.use(authRouter);


app.listen(3000, () => {
    console.log('Listening');
});
// lets us know that our server is up & running 