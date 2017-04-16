# messapp

Messapp is a simple messaging app that allows anyone to post, retrieve and delete messages. Messapp can also check if words or phrases are [palindromes](https://en.wikipedia.org/wiki/Palindrome). You can use messapp in two ways, either by calling the REST APIs or interacting with the UI.

Messapp is built using [NodeJS](https://nodejs.org/en/) & [ExpressJS](https://expressjs.com/), [React](https://facebook.github.io/react/) and [MongoDB](https://www.mongodb.com/).

## Getting started
Download and install [MongoDB](https://www.mongodb.com/download-center). **MongoDB needs to be started before starting the app server**.

Run the following command to install dependencies:
```shell
npm install
```
You can start the server by executing:
```shell
npm start
```
Or to start the server in debug mode:
```shell
npm run start:debug
```
To open the UI, navigate to `http://localhost:8080/` in your browser.

## REST APIs
Messapp exposes REST APIs to post, retrieve all messages, retrieve a specific message, delete a message or check if an existing message is a palindrome.

### API Structure
All APIs start with `/api`, followed by entity name (`/messages`) and specific resource (`/{id}/palindrome`).

#### Messages API
##### _`GET /api/messages`_ returns messages as an array of JSON objects.

`http://localhost:8080/api/messages` will return:

`[
  {
    "_id": "58f1ca74c5521508e0335015",
    "text": "test",
    "date": "Saturday, April 15th, 2017, 3:23:32 AM",
    "length": 4,
    "isPalindrome": false
  }
 ]`

##### _`GET /api/messages/{id}`_ returns a message based on the id as JSON.

`http://localhost:8080/api/messages/58f1ca74c5521508e0335015/` will return:

`{
  "_id": "58f1ca74c5521508e0335015",
  "text": "test",
  "date": "Saturday, April 15th, 2017, 3:23:32 AM",
  "length": 4,
  "isPalindrome": false
}`

##### _`GET /api/messages/{id}/palindrome`_ returns true if the message is a palindrome, false otherwise.

`http://localhost:8080/api/messages/58f1ca74c5521508e0335015/palindrome` will return:

`{
  "palindrome": false
}`

##### _`POST /api/messages/`_ returns the newly message as JSON. The payload needs to have the property 'text' defined.

`http://localhost:8080/api/messages` with payload `{text: 'sample text'}` will return:

`{
  "text": "sample text",
  "date": "Sunday, April 16th, 2017, 1:05:01 AM",
  "length": 11,
  "isPalindrome": "",
  "_id": "58f2fb7d90ef821a741122c1"
}`

##### `DELETE /api/messages/{id}` deletes a message based on the id and returns no content.

`http://localhost:8080/api/messages/58f2fb7d90ef821a741122c1`

## Architecture
Messapp can be split into two main components: Server and UI.

### Server
The server side code follows the **MVC** pattern. The starting point for the server is the file `server.js` found at the root level of the project.

##### Model
The models for the app can be found inside the folder `models`. Models are JavaScript Objects that contain properties called `properties` and `required`.

##### View
The views for the app   be found inside the folder `views`. Views are html that the server returns.

##### Controller
The controllers for the app can be found inside the folder `controllers`. Controllers are the functions that get executed when endpoints are called.

##### Other
There are also two additional folders to consider, namely `libs` and `middleware`. The `libs` folder contains additional libraries that the app is dependent on (e.g. `palindrome.js`). The `middleware` folder contains are middleware that gets executed by the server when processing a request.

### UI
All UI code (js files, stylesheets, etc.) can be found in the folder `ui`. Inside `ui` there are two additional folders, one for distribution (transpiled, minified code) called `dist` and the other source called `src`.

## Use Cases
The following explains the REST API use case in a sequence diagram
```xml
<myxml>
<mxfile type="device" userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36" version="6.5.2" editor="www.draw.io"><diagram name="Page-1">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</diagram></mxfile>
</myxml>
```

## Tests
Run the following command to execute _just_ the unit tests:
```shell
npm run test:unit
```

Run the following command to execute _just_ the system tests:
```shell
npm run test:system
```

**_IMPORTANT:_ the MongoDB server needs to be running but the app server needs to be stopped in order for the system tests to run correctly.** The reason is the tests will start/stop the app server and do database clean up.

Run the following command to execute all the tests:
```shell
npm test
```

## Additional npm Scripts
`npm build:js` builds the project

`npm lint` executes eslint

`npm jsdoc` generates jsdoc

`npm watch` builds the project when changes to the ui code are detected

## License
Code released under the MIT License.
