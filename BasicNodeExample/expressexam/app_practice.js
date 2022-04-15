var express = require('express');
var app = express();

app.get('/', function(req,res){
    res.send('hello world');
})


app.get('/hello', function(req,res){
    res.send('Dankook Univ');
})

app.get('/html', function(req,res){
    res.sendfile('intro_practice.html');
})

app.listen(3000,function(){
    console.log('Example app listening on port 3000! ')
})
