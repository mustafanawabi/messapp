# messapp

Messapp is a simple messaging app that allows anyone to post, retrieve and delete messages. Messapp can also check if words or phrases are [palindromes](https://en.wikipedia.org/wiki/Palindrome). You can use messapp in two ways, either by calling the REST APIs or interacting with the UI.

Messapp is built using [NodeJS](https://nodejs.org/en/) & [ExpressJS](https://expressjs.com/), [React](https://facebook.github.io/react/) and [MongoDB](https://www.mongodb.com/).

## Getting started
### Prerequisites
Download and install [MongoDB](https://www.mongodb.com/download-center). **MongoDB needs to be started before starting the app server**. For information on how to start MongoDB, click [here](https://docs.mongodb.com/manual/tutorial/manage-mongodb-processes/).

Download and install [NodeJS](https://nodejs.org/en/download/).

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
The models for the app can be found inside the folder `models`. Models are JavaScript Objects that contain properties called `properties` and `required`. Models are used to validate incoming POST requests.

##### View
The views for the app   be found inside the folder `views`. Views are html that the server returns.

##### Controller
The controllers for the app can be found inside the folder `controllers`. Controllers are the functions that get executed when endpoints are called.

##### Other
There are also two additional folders to consider, namely `libs` and `middleware`. The `libs` folder contains custom libraries that the app is dependent on (e.g. `palindrome.js`). The `middleware` folder contains middleware that gets executed by the server when processing a request.

### UI
All UI code (js, stylesheets, etc.) can be found in the folder `ui`. Inside `ui` there are two additional folders, one for distribution (transpiled, minified code) called `dist` and the other source called `src`.

## Use Cases
The following sequence diagram describes the interaction for the REST APIs
![alt tag](https://cloud.githubusercontent.com/assets/4382148/25074260/40b6d148-22c5-11e7-8ace-1ce56e184340.png)

The following sequence diagram describes the interaction for the UI
![alt tag](https://cloud.githubusercontent.com/assets/4382148/25074261/41d969dc-22c5-11e7-8fda-e01b0ca7e132.png)

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

`npm build:css` minifies stylesheets

`npm lint` executes eslint

`npm jsdoc` generates jsdoc

`npm watch` builds the project when changes to the ui code are detected

## License
Code released under the MIT License.
