let express = require('express');
let bodyParser = require('body-parser');

var app = express();

app.get('/api/stuff', function(req,res,next) { }, function(req, res, next){ }) //...

app.get('/api/stuff', function(req,res,next) { 
    // Changes made to req here exist on req in the next function
    // next() <- This is the trigger to move on to the NEXT function in the chain
    next(); // You must call next in any middleware
}, function(req, res, next){ 
    // Changes made to req in the previous function exist here
    // You don't need to call next in the last function
    // You must call res.send/end/json in the last function
}) //...You could add as many functions here as you want


function inlineMiddleware(req, res, next){ //Uses the same parameters
    next();
}

app.get('/api/stuff', inlineMiddleware, function(req, res, next){ 
    //indlineMiddleware is called first
    //this anonymous function is called next
}) 


app.use(bodyParser.json());

app.get('/api/stuff', inlineMiddleware, function(req, res, next){ 
    //Body-parser is called first
    //then inlineMiddleware
    //then this anonymous function
}) 