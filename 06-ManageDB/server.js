var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    url = require('url'),
    port = 8080,
    mysql = require('mysql'),
    db_conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });

app.use(express.logger());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
db_conn.connect();

// Direct to add new page
app.get('/new', function(req, res) {
    return res.redirect('/new_member.html');
});

// View all members saved in DB
app.get('/members', function(req, res) {
    db_conn.query("SELECT * FROM members", function (error, results, fields) {
        if (error) throw error;
        return res.render('view_members', {members_data: results});
    });
});

// View a member with given id 
app.get('/members/:mem_id', express.basicAuth('Admin', 'Admin'), function (req, res) {
    let member_id = req.params.mem_id;
 
    if (!member_id) {
        return res.status(400).send({ error: true, message: 'Please provide member_id' });
    } else if (isNaN(member_id)){
        return res.status(400).send({ error: true, message: 'Please provide a numerical member_id' });
    }
    
    db_conn.query('SELECT * FROM members where id=?', member_id, function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0)
        	return res.render('view_members', {members_data: results});
        else
        	return res.status(400).send({ error: true, message: 'No such member ID.' });
    }); 
});

// Add a new member  
app.post('/members', function (req, res) {
    var post_data = req.body;
    let name = post_data.member_name;
 
    if (!name) {
        return res.status(400).send({ error:true, message: 'Please provide member name' });
    }
 
    db_conn.query("INSERT INTO members SET ? ", { name: name }, function (error, results, fields) {
        if (error) throw error;
        return res.redirect('/members');
        // return res.send({ error: false, data: results, message: 'New mamber has been added successfully.' });
    });
});

app.listen(port, function () {
    console.log('Node app is running on port ' + port);
});