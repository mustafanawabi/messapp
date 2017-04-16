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
To open the UI, navigate to `http://localhost:80/` in your browser.

## REST APIs
Messapp exposes REST APIs to post, retrieve all messages, retrieve a specific message, delete a message or check if an existing message is a palindrome.

### API Structure
All APIs start with `/api`, followed by entity name (`/messages`) and specific resource (`/{id}/palindrome`).

#### Messages API
##### _`GET /api/messages`_ returns messages as an array of JSON objects.

`http://localhost:80/api/messages` will return:

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

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/` will return:

`{
  "_id": "58f1ca74c5521508e0335015",
  "text": "test",
  "date": "Saturday, April 15th, 2017, 3:23:32 AM",
  "length": 4,
  "isPalindrome": false
}`

##### _`GET /api/messages/{id}/palindrome`_ returns true if the message is a palindrome, false otherwise.

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/palindrome` will return:

`{
  "palindrome": false
}`

##### _`POST /api/messages/`_ returns the newly message as JSON. The payload needs to have the property 'text' defined.

`http://localhost:80/api/messages` with payload `{text: 'sample text'}` will return:

`{
  "text": "sample text",
  "date": "Sunday, April 16th, 2017, 1:05:01 AM",
  "length": 11,
  "isPalindrome": "",
  "_id": "58f2fb7d90ef821a741122c1"
}`

##### `DELETE /api/messages/{id}` deletes a message based on the id and returns no content.

`http://localhost:80/api/messages/58f2fb7d90ef821a741122c1`

## Architecture
Messapp can be split into two main components: Server and UI.

### Server
The server side code follows the **MVC** pattern. The starting point for the server is the file `server.js` found at the root level of the project.

##### Model
The models for the app can be found inside the folder `models`. Models are Javascript Objects that contain properties called `properties` and `required`.

##### View
The views for the app   be found inside the folder `views`. Views are html that the server returns.

##### Controller
The controllers for the app can be found inside the folder `controllers`. Controllers are the functions that get executed when certian endpoints are called.

##### Other
There are also two additional folders to consider, namely `libs` and `middleware`. The `libs` folder contains additional libaries that the app is dependent on (e.g. `palindrome.js`). The `middleware` folder contains are middleware that gets executed by the server when processing a request.

### UI
All UI code (js files, stylesheets, etc.) can be found in the folder `ui`. Inside `ui` there are two additional folders, one for distribution (transpiled, minified code) called `dist` and the other source called `src`. 

## Use Cases

## Tests
Run the following command to run _just_ the unit tests:
```shell
npm run test:unit
```

Run the following command to run _just_ the system tests:
```shell
npm run test:system
```

**_Important:_ the MongoDB server needs to be running but the app server needs to be stopped in order for the system tests to run correctly.** The reason is the tests will start/stop the app server and do database clean up.

Run the following command to all the tests:
```shell
npm test
```

## npm scripts
`npm build:js` builds the project with browserify and babelify.
`npm lint` executes eslint
`npm jsdoc` generates jsdoc
`npm watch` builds the project when changes to the ui code are detected

## License
Code released under the MIT License.
