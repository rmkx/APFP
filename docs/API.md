# API

### Written in [Node Js](https://nodejs.org/en/)
<br>

## Basics - HTTP Requests

 <table style="width:75%;">
  <tr>
    <th style="border-bottom: 1px solid darkgrey;">Method</th>
    <th style="border-bottom: 1px solid darkgrey;">Action</th>
  </tr>
  <tr>
    <td>GET</td>
    <td>Requests a representation of the specified resource</td>
  </tr>
  <tr>
    <td>POST</td>
    <td>Used to submit an entity to the specified resource</td>
  </tr>
  <sub>Descriptions provided courtesy of <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods">MDN</a></sub>
</table>
<br>
<div id="UserObj"></div>

## The User Object 

<br>
<p>The user object is the main data that is being transferred in this Api, you will be using this a lot. The base object is formatted as shown in the following code block:</p>
```
{'userId':UserID, 'staticImage':IMG_Static, 'animatedImage':IMG_Playing}
```
<small>Note: There are certain endpoints that require a modified user object, but they will always contain these base items.</small>
<br>

## Endpoints - Overview

 <table style="width: 100%;">
  <tr>
    <th style="border-bottom: 1px solid darkgrey;">URL</th>
    <th style="border-bottom: 1px solid darkgrey;">Description</th>
    <th style="border-bottom: 1px solid darkgrey;">Params</th>
    <th style="border-bottom: 1px solid darkgrey;">Type</th>
  </tr>
  <tr id="AddUserTB">
    <td><a href="#AddUser">/AddUser</a><br><small> <a href="/Helper">Bot</a></small></td>
    <td>The endpoint used to create user entries into the database, these requests await approval before being commited. This endpoint is used by the Discord bot</td>
    <td><code>User Id, Static Image, Animated Image, Token</code></td>
    <td>POST</td>
  </tr>
  <tr id="AddUserBTNTB">
    <td><a href="#AddUserBTN">/AddUserBTN<br><small> <a href="/Bot">Discord</a></small></td>
    <td>The endpoint used to create user entries into the database, these requests await approval before being commited. This endpoint is <b>pending use</b> in the settings menu of Discord.</td>
    <td><code>User Id, Static Image, Animated Image</code></td>
    <td>POST</td>
  </tr>
    <tr id="EditUsersTB">
    <td><a href="#EditUsers">/EditUsers<br><small> <a href="/Website">Website</a></small></td>
    <td>The endpoint used to approve and commit users to the database, this is triggered by the website's approve page</td>
    <td><code>User Id, Static Image, Animated Image, Approved Status, Token</code></td>
    <td>POST</td>
  </tr>
    </tr>
    <tr id="ReqUserTB">
    <td><a href="#ReqUser">/ReqUser<br><small> <a>Not In Use</a></small></td>
    <td>The endpoint used to retrieve individual users by their Id, currently not in use by any existing components.</td>
    <td><code>User Id</code></td>
    <td>GET</td>
  </tr>
    </tr>
    <tr id="ReqAllTB">
    <td><a href="#ReqAll">/ReqAll<br><small> <a href="/Website">Website</a></small></td>
    <td>The endpoint used to retrieve individual users by their Id, currently not in use by any existing components.</td>
    <td><code><b>No Params</b></code></td>
    <td>GET</td>
  </tr>
    </tr>
    <tr id="Oauth2TB">
    <td><a href="#Oauth2">/Oauth2<br><small> <a href="/Bot">Discord</a></small></td>
    <td>The endpoint used by the <b>pending</b> settings menu option for setting profile pictures, this is the authorization aspect of the menu (prevents user Id spoofing). runs through the Discord Oauth2 system. This endpoint is meant to be paired with the <a href="#AddUserBTNTB">/AddUserBTN</a> endpoint.</td>
    <td><code><b>No Params</b></code></td>
    <td>POST</td>
  </tr>
</table>
<br>

## Endpoints - Details & Examples
<br>

### /AddUser <sub id="AddUser"><small>POST</small></sub>
<p>This endpoint is used by the Discord bot to make the initial request to the database. This is hosted on the Repl.it for the Api and is stored in Json formatting. Requests are taken from this initial database in other actions and the website is built upon this. This endpoint uses a modified <a href="#UserObj">user object</a> with an added token that is stored in the bot as an environment variable.</p>

Example:

```Python
    url = 'https://APFP-JS-API.p0rtl.repl.co/AddUser'
	data = {'userId':UserID, 'staticImage':IMG_Static, 'animatedImage':IMG_Playing, 'TOKEN':RQTOKEN}
	headers = {'Auth': "Token"}
	requests.post(url, data = data, headers = headers)
```
<sub>Note: Token is deprecated for future use in the request body.</sub>
<br>

### /AddUserBTN <sub id="AddUserBTN"><small>POST</small></sub>
<p>This endpoint <b>will</b> be used in the future for the settings menu option of setting a profile picture. This functions in the same way as the primary /AddUser endpoint, with authorization being handled differently. This endpoint is to be used in conjuction with the /Oauth2 endpoint for authorization, due to this it uses the basic <a href="#UserObj">user object.</a></p>

Example:

```Python
    url = 'https://APFP-JS-API.p0rtl.repl.co/AddUserBTN'
	data = {'userId':UserID, 'staticImage':IMG_Static, 'animatedImage':IMG_Playing}
	requests.post(url, data = data)
```

### /EditUsers <sub id="EditUsers"><small>POST</small></sub>
<p>This endpoint is used by the website for approving and pushing users to the final database hosted on the Github repository for APFP. This endpoint triggers an update of the approved status for each user. It also triggers the api to compile the Json database to css for use in the plugin. This is the css that is finally pushed to the repo. This endpoint uses a modified <a href="#UserObj">user object</a> with an additional item for approve status.</p>

Example:

```Python
    url = 'https://APFP-JS-API.p0rtl.repl.co/EditUsers'
	data = {'userId':UserID, 'staticImage':IMG_Static, 'animatedImage':IMG_Playing, 'Approved':ApprovedStatus}
	requests.post(url, data = data)
```
The approved status is based on a number system:

* 0 - Pending
* 1 - Approved
* 2 - Denied
<br>

### /ReqUser <sub id="ReqUser"><small>GET</small></sub>
<p>This endpoint is used to retrieve a single user by their Id. This will return the modified <a href="#UserObj">user object</a> that includes the approve status. This is not currently used in any components of the APFP system.</p>

Example:

```Python
    url = 'https://APFP-JS-API.p0rtl.repl.co/ReqUser'
	data = {'userId':UserID}
	requests.get(url, data = data)
```
<br>

### /ReqAll <sub id="ReqAll"><small>GET</small></sub>
<p>This endpoint is the alternative to /ReqUser, it returns all of the users stored in the Repl.it database. It will return the data as <a href="#UserObj">user objects</a>.</p>

Example:

```Python
    url = 'https://APFP-JS-API.p0rtl.repl.co/ReqAll'
	requests.get(url)
```
<br>

### /Oauth2 <sub id="Oauth2"><small>POST</small></sub>
<p><b>Under Construction</b></p>