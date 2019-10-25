var express = require('express'),
    app = express();

app.set('view engine', 'ejs');

var posts_arr = [
    {
        name: 'Post 1',
        body: 'This is the body of post 1'
    },
    {
        name: 'Post 2',
        body: 'This is the body of post 2 in array'
    }
];

app.get('/posts', function(req, res){
    res.render('post', {posts_data: posts_arr});
})

app.listen(8080);