const fs = require("fs");
const path = require("path");
const https = require("https");

const helmet = require("helmet");
const express = require("express");
const password = require("passport");
const passport = require("passport");
const { Strategy } = require("passport-google-oauth20");
require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile: ", profile);
  // save user in database
  done(null, profile); // passing profile - passport knows user is authinticated
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

const app = express();

app.use(helmet());
app.use(passport.initialize());

function checkLoggedIn(req, res, next) {
  const isLoggedIn = true; //TODO:
  if (!isLoggedIn) {
    res.status(401).json({
      error: "You must log in!"
    });
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false
  }),
  (req, res) => {
    console.log("Google called us baack!");
  }
);

app.get("/auth/logout", (req, res) => {});

app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Your personal secret value");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/failure", (req, res) => {
  return res.send("Failed to login");
});

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem")
    },
    app
  )
  .listen(PORT, () => {
    console.log(`🚀 Listening on port ${PORT}...`);
  });
