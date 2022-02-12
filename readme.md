# Nots-app

## Overview

This is a REST API designed to serve a chat app front end for rendering.

Interacts with WhatsApp through the [Twilio WhatsApp API](https://www.twilio.com/docs/whatsapp).

### Tech

#### [Node](https://nodejs.org/en/)

`The base of the project. Allows Javascript code to be ran on a server.`

#### [Express](https://expressjs.com/)

`Builds upon and simplifies some of Nodes web server functionality. Comes with features such as middleware and routing.`

#### [Socket.io](https://socket.io/)

`Used to create duplex connections between the API and a connected front end. >Allows for instant user feedback.`

#### [MongoDB](https://www.mongodb.com/)

`A non-relational database. Hosted in the cloud at [MongoDB Atlas](https://www.mongodb.com/atlas) and interacted with using [mongoose](https://mongoosejs.com/).`

### Setup

Node version used - `v16.13.0`

After the prerequisite version of node has been installed take the following steps;

- Clone the project from [here](https://github.com/CtrlHoltDel/nots-app-be)

- Sign up to both Twilio and MongoDB atlas (linked above). Get the required tokens and passwords as outlined below from the respective services - place them in a file named `.env` in the root of the folder.

```js
TWILIO_AUTH_TOKEN = `## Auth Token ##`;
TWILIO_SID = `## sid ##`;

MG_DB = `## database name ##`;
MONGO_PW = `## mongo-db-password ##`;
```

- Install dependencies by running the command `npm i` whilst in the root folder.

- Finally run the command `npm start` whilst in the root folder.

This will a version of the API locally at http://localhost:9000. This can be altered by changing the `PORT` variable in the `listen.js` file in the root folder.
