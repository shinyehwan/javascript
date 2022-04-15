var express = require('express');
var app = express();

app.get('/', function(req,res){
    res.send('hello world');
});

app.get('/hello', function(req,res){
    res.send('Dankook Univ');
});

app.get('/html', function(req,res){
    res.sendfile('intro.html');
});

app.get('/layout', function(req,res){
    res.sendfile("intro2.html");
})

app.get('/hrtag', function(req,res){
    res.sendfile('intro3.html');
})

app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});