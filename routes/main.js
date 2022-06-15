const express = require('express');
const { model, modelNames } = require('mongoose');
const router = express.Router()
const post= require('../models/post')

router.get('/', (req, res) => {
    var rand = Math.floor(Math.random() * (post.length - 1)) + 2;
      // res.send('Hello World!');

    post.find({}).limit(4).skip(rand).lean().then(posts=> {
        res.render('home', { posts: posts });
    })
})

router.get('/about', (req, res) => {
    res.render('about');
})  
router.get('/add', (req, res) => {
    res.render('add');
})
router.get('/contact', (req, res) => {
    res.render('contact');
})

router.get('/shop-single', (req, res) => {
    res.render('shop-single');
})



router.get('/shop', (req, res) => {

    post.find({}).lean().then(posts=> {
        res.render('shop', { posts: posts });
    })

}) 
router.get('/profile', (req, res) => {
    res.render('profile');
})  

module.exports = router;