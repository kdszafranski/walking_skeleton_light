var express = require('express');
var app = express();
var path = require('path');

app.set('port', 5000);


//ROUTE FUNCTIONALITY
app.get('/*', function(req, res){
    console.log("Here is the request: " , req.params);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname,"./public", file));
});
//

app.listen(app.get('port'), function(){
    console.log('Listening on port: ' + app.get('port'));
});