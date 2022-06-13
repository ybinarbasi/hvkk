const express = require('express');
const { model, modelNames } = require('mongoose');
const router = express.Router()
const post= require('../models/post')
const Path = require('path')

/* router.get('/new', (req, res) => {
    if(req.session.userId){
        return res.render('add-post');
    }
    res.redirect('/users/login');
}) */
router.get('/new',(req,res)=> { 
    if(req.session.userId){
        return res.render('add-post');
    }else{
    res.redirect('/users/login');
    }
})

router.get('/:id', (req, res) => {

    post.findById(req.params.id).lean().then(post=> {
        res.render('shop-single', { post: post });
    })
    
})

router.post('/test', (req, res) => {

    let post_image=  req.files.post_image
    post_image.mv(Path.resolve(__dirname, `../public/assets/img/postimage` ,post_image.name))

    

    post.create({
        ...req.body,
        post_image:`/assets/img/postimage/${post_image.name}`,



    }, )
    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Poat ekleme başarılı'
    }
   
    res.redirect('/shop');
});  // end of post.create


         //create a new post

module.exports = router