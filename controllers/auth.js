const express = require('express');
const passport = require("../config/ppConfig");
const db = require("../models");

const router = express.Router();

router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// POST - Sign up new users
router.post("/signup", (req, res) => {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    }, defaults: {
      name: req.body.name,
      password: req.body.password
    }
  }).then(([user, created]) => {
    if (created) {
      console.log("User created");
      passport.authenticate("local", {
        successRedirect: "/"
      })(req, res);
    } else {
      console.log("User already exists");
      res.redirect("/auth/signup");
    }
  }).catch(err => {
    console.log("Error occurred creating user", err);
    res.redirect("/auth/signup");
  })
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/auth/login"
}));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});



module.exports = router;
