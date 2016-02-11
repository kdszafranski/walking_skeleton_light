var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//APP SETTINGS
mongoose.connect('mongodb://localhost:27017/iota_cats');

app.set('port', 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//SCHEME
var Cat = mongoose.model('Cat', {name: String});

//ROUTE FUNCTIONALITY
app.post('/cat', function(req,res){
    console.log("ITS ALIVE! ", req.body);

    var kitty = new Cat({
        name: req.body.catName
    });

    kitty.save(function(err, gremlins){
        if(err){
            console.log(err);
        }

        res.send(gremlins);
    });
});

app.get("/cat", function(req,res){
    Cat.find({}).exec(function(err, gremlins){
        if(err){
            console.log(err);
        }

        res.send(gremlins);
    });
});

app.get('/*', function(req, res){
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname,"./public", file));
});
//

app.listen(app.get('port'), function(){
    console.log('Listening on port: ' + app.get('port'));
});