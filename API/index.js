const mySecret = process.env['APPR-TOKEN']
var express = require("express");
var myParser = require("body-parser");
var app = express();
fs = require('fs');
path = require('path');
const { Octokit } = require("@octokit/rest");
const crypto = require("crypto");

const APPRTOKEN = process.env['APPR-TOKEN'];
const RQTOKEN = process.env['RQ-TOKEN']
const GTOKEN = process.env['GTOKEN']

const octokit = new Octokit({auth: GTOKEN, userAgent: "Node.JS Automation"})

function jsonTocss(json) {
    return Object.keys(json).reduce((css, key) => {
        let tempUser = json[key];

				if (tempUser.Approved == 1) {
        css += `[apfp-user-id='${key}']{--user-avatar-static:url('${tempUser.Static}');--user-avatar-playing:url('${tempUser.Animated}');--user-avatar-opacity:0}`;

        return css;

				} else {
					console.log("Not Approved")
				}

				return css;
    }, "");
}

function writeCss(json) {
	css = jsonTocss(json)
	fs.writeFile('db.css', css, function (err) {
		if (err) return console.log(err);
	});
	return css
}

function writeJson(json) {
	var json_str = JSON.stringify(json)
	fs.writeFile('db.json', json_str, function (err) {
		if (err) return console.log(err);
	});
}

async function update(contents, extension) {

	let base = ""

	if (extension == "json") {
		base = JSON.stringify(contents)
	} else if (extension == "css") {
		base = contents.toString()
	} else {
		console.log("Invalid File Extension")
	}

	path = `src/db.${extension}`
	
	let buff = Buffer.from(base, 'utf-8');
	let base64 = buff.toString('base64');

	try {
		file = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
			owner: 'rmkx',
			repo: 'APFP',
			path: path
		})
	}
	catch(err) {
		console.log(err.message)
	}

  //var date = new Date();
  //var time = date.getTime();
	//shaInput = contents + time
	//let sha = crypto.createHash('sha1').update(shaInput).digest('hex')

	let sha = file.data.sha

	try {
		await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
			owner: 'rmkx',
			repo: 'APFP',
			path: path,
			message: 'Auto-Update',
			content: base64,
			sha: sha
		});
	}
	catch(err) {
		console.log(err.message)
	}

}

app.use(myParser.urlencoded({extended : true}));
app.post("/AddUser", function(request, response) {
	let json = require('./db.json');
  unparseDat = request.body;
  reqToken = unparseDat.TOKEN;
  userId = unparseDat.userId;
  parseDat = {'Static': unparseDat.staticImage, 'Animated': unparseDat.animatedImage, 'Approved': 0};
	json[userId] = parseDat
  if (reqToken == RQTOKEN) {
    writeJson(json);
  } else {
    console.log("Mismatched Token");
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
    writeJson(json);
  } else {
    console.log("Mismatched Token");
  }
	css = writeCss(json)
	update(json, "json");
	update(css, "css");
	response.redirect(200, 'https://rmkx.github.io/APFP/web/');
  //response.send("200");
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
