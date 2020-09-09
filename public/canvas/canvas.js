var socket = io();
socket.on('mouseDown', _mouseDown);
socket.on('mouseDrag', _mouseDrag);

var paths = [];
function findLocalPath(id){
  for(i in paths){
    if(paths[i].id = id){
      return paths[i].path;
    }
  }
}

function removeLocalPath(id){
  for(i in paths){
    if(paths[i].id = id){
      paths.splice(i, 1);
    }
  }
}

function _mouseDown(data){
  var path = new Path();
  path.strokeColor = 'black';
  removeLocalPath(data.id);
  paths.push({id: data.id, path: path});
}

function _mouseDrag(data){
  var path = findLocalPath(data.id);
  path.add({x: data.point[1], y: data.point[2]});
}

function _savePath(id, pathData){
  var data = {id: id, pathData: pathData}
  var options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  fetch('/newPath', options);
}

var myPath;
var scrollStart = 0;
function onMouseDown(event) {
  if(Key.isDown('space')){
    scrollStart = event.point;
  }else{
    myPath = new Path();
    myPath.strokeColor = 'black';
    socket.emit('mouseDown', {id: socket.id});
  }
}

function onMouseDrag(event) {
  if(Key.isDown('space')){
    var scrollCur = event.point;
    var x = scrollStart.x - scrollCur.x;
    var y = scrollStart.y - scrollCur.y;
    $('html').scrollLeft($('html').scrollLeft() + x);
    $('html').scrollTop($('html').scrollTop() + y);
  }else{
    myPath.add(event.point);
    socket.emit('mouseDrag', {id: socket.id, point: event.point});
  }
}

function onMouseUp(event){
  if(Key.isDown('space')){
    
  }else{
    myPath.add(event.point);
    _savePath(socket.id, myPath.pathData);
  }
}

function getData(){
  $.get("/getData",function(data, status){
    for(var i in data){
      var _path = new Path(data[i].pathData);
      _path.strokeColor = 'black';
    }
  })
}

$(document).ready(function(){
  getData();
});

