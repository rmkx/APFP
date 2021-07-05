var express = require("express");
var myParser = require("body-parser");
var app = express();
fs = require('fs');
path = require('path');

const APPRTOKEN = process.env['APPR-TOKEN'];
const RQTOKEN = process.env['RQ-TOKEN']

app.use(myParser.urlencoded({extended : true}));
app.post("/AddUser", function(request, response) {
  unparseDat = request.body;
  console.log(unparseDat);
  reqToken = unparseDat.TOKEN;
  userId = unparseDat.userId;
  parseDat = {'Static': unparseDat.staticImage, 'Animated': unparseDat.animatedImage, 'Approved': 0};
  if (reqToken == RQTOKEN) {
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
app.post("/EditUsers", function(request, response) {
  function isPositiveInteger(n) {
    return parseFloat(n) === n >>> 0;
  }
  unparseDat = request.body;
  let json = require('./db.json');
  reqToken = unparseDat.TOKEN;
  //console.log(unparseDat);
  RqKeys = Object.keys(unparseDat);
  DbKeys = Object.keys(json);
  //console.log(RqKeys, DbKeys)

  RqKeys.forEach((RqKeys, index) => {
    idx = DbKeys.indexOf(RqKeys);
    if (isPositiveInteger(idx)) {
      obj = json[DbKeys[idx]];
      obj.Approved = parseInt(unparseDat[RqKeys]);
    }
  }); 
  console.log(json)
  if (reqToken == APPRTOKEN) {
    WriteJson();
  } else {
    console.log("Mismatched Token");
  }
  function WriteJson() {
    var json_str = JSON.stringify(json)
    fs.writeFile('db.json', json_str, function (err) {
      if (err) return console.log(err);
    });
  }
  response.send("200");
});
app.get("/ReqUser", function(request, response) {
  response.set('Cache-Control', 'no-store')
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let json = require('./db.json');
  parseDat = request.query.userId
  sendDat = json[parseDat]
  response.send(sendDat);
});
app.get("/ReqAll", function(request, response) {
  response.set('Cache-Control', 'no-store')
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  let json = require('./db.json');
  response.send(json);
});
 
app.listen(8080);
