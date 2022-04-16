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

app.get('/tagtext',function(req,res){
    res.sendfile('intro4.html');
})

app.get('/hyperweb',function(req,res){
    res.sendfile('intro5.html');
})
app.get('/hyperweb2',function(req,res){
    res.sendfile('intro6.html');
})
app.get('/hypertext',function(req,res){
    res.sendfile('intro7.html');
})
app.get('/hyperemail',function(req,res){
    res.sendfile('intro8.html');
})
app.get('/taglist',function(req,res){
    res.sendfile('intro9.html');
})


app.listen(3000, function(){
    console.log('Example app listening on port 3000!');
});