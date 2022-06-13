const express = require('express');
const router = express.Router()
const Path = require('path')
const post= require('../models/post')
const user = require('../models/user');


router.get('/register', (req, res) => {
    res.render('register');
})


router.post('/register', (req, res) => {
    user.create(req.body, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            res.redirect('/');
        }
    })
})

router .get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    user.findOne({ email: email, password: password }, (err, user) => {
        if (err) {
            res.send(err);
        } else {
            if (user) {
                if(user.password == password){
                    req.session.userId = user._id;
                    res.redirect('/');
                    
                   // res.send('Başarılı giriş');
                }else{
                    res.redirect('/users/login');
                  //  res.send('Kullanıcı adı veya şifre yanlış');
                }
            } else {
                res.redirect('/users/register');
               // res.send('Hesabiniz bulunamadı lütfen kayıt olunuz');
               
            }
        }
    }
    )

})

router .get('/logout', (req, res) => {

    req.session.destroy(()=> {
        res.redirect('/');
    })
})

module.exports = router