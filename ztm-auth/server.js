const fs = require("fs");
const path = require("path");
const https = require("https");

const helmet = require("helmet");
const express = require("express");
const password = require("passport");
const passport = require("passport");
const cokieSession = require("cookie-session");
const { Strategy } = require("passport-google-oauth20");
require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2
};

const AUTH_OPTIONS = {
  callbackURL: "/auth/google/callback",
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET
};

function verifyCallback(accessToken, refreshToken, profile, done) {
  console.log("Google profile: ", profile);
  // save user in database
  done(null, profile); // passing profile - passport knows user is authinticated and to session
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
  //user is google profile
  done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
  // User.findById(id).then(user => {
  //   done(null, user);
  // });
  done(null, id);
});

const app = express();
app.use(helmet());

// after helmet but before passport initialize
app.use(
  cokieSession({
    name: "session",
    maxAge: 1000 * 60 * 60 * 24, //ms
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]
  })
);

app.use(passport.initialize());
app.use(passport.session());

function checkLoggedIn(req, res, next) {
  console.log(req.user);
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({
      error: "You must log in!"
    });
  }
  next();
}

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email"]
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true
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
