var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');
var Schema = mongoose.Schema;
//// instatiating all variable requirements.
var listSchema = new Schema({
  todo       : String,
  details    : String,
  is_done    : Boolean,
  created_at : Date
});

//// Setting server post functionality to database
var ListItem = mongoose.model('ListItem' , listSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('view engine', 'jade');
app.use(methodOverride('_method'));
////

app.get('/', function (req, res){
  console.log("Connected to Homepage");
  // res.send('success youve connected to the home page');
  ListItem.find(function (err, listItems){
    res.render('to_do_list', { listItems : listItems });
  });
});
app.get('/new-todo', function (req, res){
  res.render('submit');
});

app.post('/todos', function (req, res){
  var todo = req.body.todo;
  var details = req.body.details;

  var newListItem = new ListItem(
    {
      todo       : todo,
      details    : details,
      is_done    : false,
      created_at : Date()
    }
  );
  newListItem.save(function(err){
    if (err) throw err;
    // res.send('successful SUBMISSION');
  res.redirect('/');
  });
  console.log('SUBMISSION SUCCESSFUL');
  console.log(newListItem);
});

app.put('/todos/:id/complete', function (req,  res){
  console.log(req.params.id);
  ListItem.update({_id : req.params.id}, { is_done : true}, function (err) {
    if (err) throw err;
    res.send("ok");
  });
});

app.put('/todos/:id/uncomplete', function (req,  res){
  ListItem.update({_id : req.params.id}, { is_done : false}, function (err){
    if(err) throw err;
    res.send("ok");
  });
});

app.delete('/todos/:id', function (req, res){
  console.log("test10101010101010", req.params.id);
  ListItem.remove({_id : req.params.id}, function (err, ListItem) {
    res.redirect('/');
  });
});

app.get('/todos/:id/edit', function (req, res){
  console.log("Connected to ahah");
  ListItem.find({_id : req.params.id}, function (err, listItems){
    console.log(typeof listItems);
    res.render('edit', { listItems : listItems });
  });
});
app.put('/todos/:id/edit', function (req, res){
  ListItem.update({_id : req.params.id}, { todo : req.body.todo, details : req.body.details }, function (err, listItem){
    res.redirect('/');
  });
});

///// Server start
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log('ToDoList app listening at http://%s:%s', host, port);
});