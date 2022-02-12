exports.endpoints = [
  {
    "/": "Serves a list of endpoints and what they do",
    "/users": [
      { GET: "Serves a list of all contacts" },
      { POST: "Posts a new contact" },
      { DEL: "Deletes the contact" },
    ],
    "/messages": [
      {
        GET: "Serves a list of messages from and to a number specified in the query. Uses E.164 formatting omitting the + symbol.",
        example: "/messages?number=447388298382",
      },

      {
        "/send": {
          POST: "Sends a message to a user specified in the body.",
          example: {
            message: "example body of the message",
            number: `whatsapp:+447388298382`,
          },
        },
      },

      {
        "/twil-message": {
          POST: "Consumes a message from the twilio API hook - updates the database and emits it to clients connected to the server.",
        },
      },
      {
        "/twil-update": {
          POST: "Consumes updates from the twilio API hook - updates the database accordingly and emits it to clients connected to the server.",
        },
      },
    ],
  },
];
