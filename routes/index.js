var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var React = require('react');
var ReactDOM = require('react-dom/server');
var router = express.Router();


router.get('/', function (req, res) {

    res.render('index', {
        //reactBoostrap: '/app/app.js',
        reactBoostrap: 'http://localhost:3030/app.js',

        user: req.user,
        //react: React.renderToString(React.createElement(HelloMessage, { name: "John" }))
    });
});

router.get('/register', function (req, res) {
    res.render('index', {
        //reactBoostrap: '/app/register.js',
        reactBoostrap: 'http://localhost:3030/register.js',
    });
});

router.post('/register', function (req, res) {
    console.log(req.body);
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.render('index', {
                reactBoostrap: 'http://localhost:3030/register.js'
            });
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});

router.get('/login', function (req, res) {
    res.render('login', { user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
});

router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function (req, res) {
    res.status(200).send("pong!");
});

module.exports = router;
