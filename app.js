var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');
var Schema = mongoose.Schema;
//// instatiating all variable requirements.
var listSchema = new Schema({
  todo : String,
  details : String,
  is_done    : Boolean,
  created_at : Date
});

//// Setting server post functionality to database
var ListItem = mongoose.model('ListItem' , listSchema);

app.use(express.static(__dirname, + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
////

app.get('/ToDoList', function (req, res){
  console.log("Connected to Homepage");
  // res.send('success youve connected to the home page');
  res.render('to_do_list');
});

app.post('/ToDoList', function (req, res){
  var todo = req.body.todo;
  var details = req.body.details;

  var newListItem = new ListItem(
    {
      todo    : todo,
      details : details
    }
  );
  newListItem.save(function(err){
    if (err) throw err;
    // res.send('successful SUBMISSION');
  res.redirect('ToDoList');
  });
  console.log('SUBMISSION SUCCESSFUL');
  console.log(newListItem);
});


///// Server start
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('ToDoList app listening at http://%s:%s', host, port);
});