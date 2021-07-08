const express = require('express');
const usersRepo = require('../../repositories/users');
const signupTemplate = require('../../views/admin/auth/signup');
const signinTemplate = require('../../views/admin/auth/signin');

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
});


router.post('/signup', async (req, res) => {
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email });
    if( existingUser ){
        return res.send('An account with this email already exists')
    }
    if( password !== passwordConfirmation ){
        return res.send('Passwords must match')
    }

    // create user in users repo to represent this person
    const user = await usersRepo.create({ email, password });

    // store the id of that user in the user's cookie
    req.session.userId = user.id; // Added by cookie-session

    res.send('Account Created!');
});


router.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out')
});


router.get('/signin', (req, res) => {
    res.send(signinTemplate());
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
   
    const user = await usersRepo.getOneBy({ email });
    console.log(user)

    if( !user ){
        return res.send('Email not found');
    }
    
    const validPassword = await usersRepo.comparePasswords(user.password, password);

    if( !validPassword ){
        return res.send('Invalid email or password');
    }

    req.session.userId = user.id;
    // at this point we are making the user considered to be authenticated w/ the app

    res.send('You are logged in')

});

module.exports = router;