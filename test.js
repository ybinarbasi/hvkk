const mongoose = require('mongoose');
const post = require('./models/post');

const Post = require('./models/post');

mongoose.connect('mongodb://127.0.0.1/my_database_test',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


/* post.findByIdAndDelete('628f3199c59651fdb182d88b', function(err, post){ 
    if(err) return console.log(err);
    console.log(post);
}); */


/* post.find({
    title: 'ikinci postum'
}, (err, posts) => {
    if(err) {
        console.log(err);
    } else {
        console.log(posts);
    }
}); */

/* Post.create({
    title: 'ikinci postum', 
    content: ' Post içeriği This is a test'
}, (err, post) => {
    console.log(err,post);
}); */