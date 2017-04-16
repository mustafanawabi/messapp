# messapp

Messapp is a simple messaging app that allows anyone to post, retrieve and delete messages. Messapp can also check if words or phrases are [palindromes](https://en.wikipedia.org/wiki/Palindrome). You can use messapp in two ways, either by calling the REST APIs or interacting with the UI.

Messapp is built using [NodeJS](https://nodejs.org/en/), [React](https://facebook.github.io/react/) and [MongoDB](https://www.mongodb.com/). 

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
##### `GET /api/messages` returns messages as an array of JSON objects.

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

##### `GET /api/messages/{id}` returns a message based on the id as JSON.

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/` will return:

`{
  "_id": "58f1ca74c5521508e0335015",
  "text": "test",
  "date": "Saturday, April 15th, 2017, 3:23:32 AM",
  "length": 4,
  "isPalindrome": false
}`

##### `GET /api/messages/{id}/palindrome` returns true if the message is a palindrome, false otherwise.

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/palindrome` will return:

`{
  "palindrome": false
}`

##### `POST /api/messages/` returns the newly message as JSON. The payload needs to have the property 'text' defined.

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

**_Important:_ the MongoDB server needs to be running but the app server needs to be stopped in order for the system tests to run correctly.** The reason is the tests will start/stop the app server.

Run the following command to all the tests:
```shell
npm test
```

## Key Features

## License
Code released under the MIT License.
