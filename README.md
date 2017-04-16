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
##### `GET /api/messages` returns an array of JSON structure messages.

**Example**

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

##### `GET /api/messages/{id}` returns a specific JSON structure message based on the id.

**Example**

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/` will return:

`{
  "_id": "58f1ca74c5521508e0335015",
  "text": "test",
  "date": "Saturday, April 15th, 2017, 3:23:32 AM",
  "length": 4,
  "isPalindrome": false
}`

##### `GET /api/messages/{id}/palindrome` returns true if the message is a palindrome, false otherwise.

**Example**

`http://localhost:80/api/messages/58f1ca74c5521508e0335015/palindrome` will return:

`{
  "palindrome": false
}`

## Architecture

## Use Cases

## Key Features

## License
Code released under the MIT License.
