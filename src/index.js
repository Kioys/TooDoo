import express from "express";
import { ParseServer } from "parse-server";
import dotenv from "dotenv";
import ParseDashboard  from "parse-dashboard"
import cloud from "./cloud/main.js";

// Configurar dotenv
dotenv.config();

const app = express();

const config = process.env;

const server = new ParseServer({
  databaseURI: config.DATABASE_URI,
  cloud,
  appId: config.APP_ID,
  masterKey: config.MASTER_KEY,
  serverURL: config.SERVER_URL,
  appName: "TooDoo App"
  // verifyUserEmails: true, // Enable email verification
  //emailVerifyTokenValidityDuration: 2 * 60 * 60, // Set email verification token validity to 2 hours

  // Set email adapter
  // emailAdapter: {
  //   module: "example-mail-adapter",
  //   options: {
  //     // Additional adapter options
  //     ...mailAdapterOptions,
  //   },
  // },
});

var options = { allowInsecureHTTP: true };
var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      appId: config.APP_ID,
      masterKey: config.MASTER_KEY,
      "appName": "TooDoo App"
    }
  ]
}, options);


// Start server
server.start();

// Serve the Parse API on the /parse URL prefix
app.use("/parse", server.app);

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

app.listen(1337, function () {
  console.log("parse-server-example running on port 1337.");
});
