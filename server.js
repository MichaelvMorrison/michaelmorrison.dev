const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

const server  = app.listen(port, () => console.log(`\nlistening on port: ${port}`));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

//DB
mongoose.connect('mongodb+srv://admin:admin@cluster0-3ohde.mongodb.net/canvas?retryWrites=true&w=majority', {
useUnifiedTopology: true,
useNewUrlParser: true,
})
.then(() => console.log('\nDB Connected'))
.catch(err => {
  console.log('\nDB Connection Error: ${err.message}');
});

var Schema = mongoose.Schema;
var pathSchema = new Schema({
id: String,
pathData: String
});
var pathModel = mongoose.model('paths', pathSchema);

const io = socket(server);
io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log(`\nNew connection: ${socket.id}`);

  socket.on('mouseDown',function(data){
    socket.broadcast.emit('mouseDown', data);
  });

  socket.on('mouseDrag', function(data){
    socket.broadcast.emit('mouseDrag', data);
  });
}

function sendData(data){
  console.log(data);
}

//ROUTES
app.get('/paper', function(req, res){
  res.type('application/javascript');
  res.sendFile(__dirname + '/node_modules/paper/dist/paper-full.min.js');
});

app.get('/p5', function(req, res){
  res.type('application/javascript');
  res.sendFile(__dirname + '/node_modules/p5/lib/p5.min.js');
});

app.post('/newPath', function(req, res){
  let newPathEntry = new pathModel();
  newPathEntry.id = req.body.id
  newPathEntry.pathData = req.body.pathData;
  newPathEntry.save(function(err, savedObject){
    if (err){
      console.log("\nError saving path to DB" + err);
      res.status(500).send();
    }else{
      console.log('New path saved to DB.');
      res.send(savedObject);
    }
  });
});

app.get('/getData', function(req, res){
  pathModel.find({},'-_id pathData',function(err, docs){
    if(err) {
      console.log(err);
    }else{
      res.send(docs);
    }
  });
});