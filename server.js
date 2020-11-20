var express = require('express');
var app = express();

const bodyParser = require('body-parser');
const cors = require('cors');
// const port = 4000;
const mongoose = require('mongoose');
mongoose.pluralize(null);

var multer = require("multer");

const jwt = require('jsonwebtoken');
const product = require('./product/routes');
const vendor = require('./vendor/routes');
const auth = require('./auth/routes');
const cart = require('./cart/routes');


app.use(cors());
app.use(bodyParser.json());
console.log("__dirname ===");
console.log(__dirname);
console.log("__dirname ===");
// app.use(multer({ dest: __dirname+'/uploads/'}).any());
app.use(multer({ dest: '/app/tmp/uploads'}).any());
// app.use(multer().any());

// mongoose.connect('mongodb://127.0.0.1:27017/practise',{useNewUrlParser:true});
mongoose.connect('mongodb+srv://rockon:asdqwe@cluster0.v1ykr.mongodb.net/shoppingPortal?retryWrites=true&w=majority',{useNewUrlParser:true});

// mongodb+srv://rockon:<password>@cluster0.v1ykr.mongodb.net/<dbname>?retryWrites=true&w=majority

const connection = mongoose.connection;
connection.once('open',function(){
	console.log("MongoDB database connection established successfully");
})

app.use('/auth',auth);
app.use('/practises',product);
app.use('/vendor',vendor);
app.use('/cart',cart);



// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static(__dirname + '/public'));

// set the home page route
app.get('/', function(req, res) {

	// ejs render automatically looks in the views folder
	res.render('index');
});

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
}); 


// const express = require('express');
// const app = express();



// app.listen(port,function(){
// 	console.log("listening on port "+port);
// });