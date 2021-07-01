var express = require("express");
var myParser = require("body-parser");
var app = express();
fs = require('fs');
path = require('path');

const TOKEN = process.env['TOKEN']

app.use(myParser.urlencoded({extended : true}));
app.post("/AddUser", function(request, response) {
  unparseDat = request.body;
  reqToken = unparseDat.TOKEN;
  userId = unparseDat.userId;
  parseDat = {'Static': unparseDat.staticImage, 'Animated': unparseDat.animatedImage};
  if (reqToken == TOKEN) {
    WriteJson();
  } else {
    console.log("Mismatched Token");
  }

  function WriteJson() {
    let json = require('./db.json');
    json[userId] = parseDat
    var json_str = JSON.stringify(json)
    fs.writeFile('db.json', json_str, function (err) {
      if (err) return console.log(err);
    });
  }
  response.send("200");
});
app.get("/ReqUser", function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let json = require('./db.json');
  parseDat = request.query.userId
  sendDat = json[parseDat]
  response.send(sendDat);
});
app.get("/ReqAll", function(request, response) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let json = require('./db.json');
  response.send(json);
});
 
app.listen(8080);
