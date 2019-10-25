var express = require('express'),
	app = express(),
	articles = require('./controllers/articles');

//Most of Web services rens on CRUD
//Create Read Update Delete

/*
In this case, wec onsider that 

a blos post is going to be like
{
	title: "blog-post title",
	body: "blog-post body",
	author: "author of the blog post",
	comments: []
}

a comment would be like
{
	name: "name of commenter",
	comment: "the comment text"
}
*/
app.use(express.bodyParser());

var notImplemented = function (req, res) {
	res.send(501);
}

//articles
app.get('/articles', articles.index);					//read all articles
app.get('/articles/new', articles.new);					//create new one
app.get('/articles/:articleId', articles.get_article);	//read one
app.post('/articles', articles.create);					//post one
app.put('/articles/:articleId', notImplemented);		//update one
app.del('/articles/:articleId', notImplemented);		//delete one


//comments
app.get('/articles/:articleId/comments', notImplemented);
app.get('/articles/:articleId/comments/new', articles.new_comment);
app.del('/articles/:articleId/comments/commentId', notImplemented);
app.get('/articles/:articleId/comments/commentId', notImplemented);
app.post('/articles/:articleId/comments', articles.create_comment);
app.put('/articles/:articleId/comments/commentId', notImplemented);

app.listen(9090);