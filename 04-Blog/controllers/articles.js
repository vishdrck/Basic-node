/*Generally we use a database to store data of these type of 
site. But here we just use an array for that and here that is*/
var blog_posts = [
	{
		name: "Post1",
		article: "Sample article 1 here",
		comments: []
	},
	{
		name: "Post2",
		article: "Sample article 2 here",
		comments: []
	}
];
/*
	In this case, we consider that 

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

//view all articles in database
module.exports.index = function(req, res) {
	res.json(blog_posts);
}

module.exports.get_article = function (req, res) {
	res.json(blog_posts[req.params.articleId]);
}

//Catch the POST request generate by the user and analyse it
module.exports.create = function(req, res) {
	req.body.comments = []; //just keep a space to add comments
	blog_posts.push(req.body);
	res.redirect('/articles');
};

//rendering an html form to let user create a blog_post
module.exports.new = function(req, res) {
	res.send("<form method='post' action='/articles'>\
				<input type='text' placeholder='blog_post_title here' name='title'></input>\
				<textarea placeholder='blog_post_body here' name='body'></textarea>\
				<input type='text' placeholder='blog_post_author here' name='author'></input>\
				<input type='submit' value='Submit!'></input>\
			</form>");
}

module.exports.new_comment = function(req, res) {
	res.send("<form method='post' action='/articles/" + req.params.articleId + "/comments'>\
				<input type='text' placeholder='your name here' name='name'></input>\
				<textarea placeholder='comment here' name='comment'></textarea>\
				<input type='submit' value='Submit!'></input>\
			</form>");
}

module.exports.create_comment = function (req, res) {
	blog_posts[req.params.articleId].comments.push(req.body);
	res.redirect('articles/' + req.params.articleId);
}
