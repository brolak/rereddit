//package and module requirements
var express = require('express')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('./models/passport');
var postRoutes = require('./routes/postRoutes');
var authRoutes = require('./routes/authRoutes');

//*dev routes*
var userRoutes = require('./routes/userRoutes');
var commentRoutes = require('./routes/commentRoutes');

var app = express();
mongoose.connect('mongodb://localhost/reddit');

//some middleware that we need
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

//*dev routes*
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);

app.use(passport.initialize());

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html")
});

//start the server
app.listen('8000', function() {
  console.log("yo yo yo, on 8000 bro");
});
