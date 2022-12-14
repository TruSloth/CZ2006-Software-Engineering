const express = require("express");
const isEmpty = require("is-empty");
const sendMail = require("../tools/nodemailer");
const router = express.Router();
const signUpTemplate = require("../models/signup");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");
const stallTemplate = require("../models/serviceProviderData");
const { response } = require("express");

dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (payload["aud"] !== process.env.CLIENT_ID) {
    throw "Token unintended for app";
  }
  return payload;
}

async function validateLoginInput(data) {
  let errors = {};

  // Check the password and confirmed password are equal
  if (data.password != data.confirmPassword) {
    errors.password = "Password Mismatch";
  }

  // Check if email is empty

  if (data.email == "") {
    errors.email = "Email is a required field";
  }
  // Check if the email already exists
  else if (
    await signUpTemplate.findOne({
      email: data.email,
    })
  ) {
    errors.email = "Email already exists";
  }

  // Check if Username is empty

  if (data.userName == "") {
    errors.userName = "Username is a required field";
  }
  // Check if the username already exists
  else if (
    await signUpTemplate.findOne({
      userName: data.userName,
      googleRegistered: false,
    })
  ) {
    errors.userName = "Username already exists";
  }

  // Check if password is empty
  if (data.password == "") {
    errors.password = "Password is a required field";
  }

  // Check if confirmPassword is empty
  if (data.confirmPassword == "") {
    errors.confirmPassword = "Confirm Password is a required field";
  }
  console.log("no errors");
  return { errors, isValid: isEmpty(errors) };
}

// Registration Page
router.post("/users/register", async (req, res) => {
  console.log("registering");
  // Ensure the input meets our requirements
  const { errors, isValid } = await validateLoginInput(req.body);

  if (!isValid) {
    res.status(401).json(errors);

    return;
  }
  // Creating a new user
  const newUser = new signUpTemplate({
    userName: req.body.userName,
    email: req.body.email,
    googleRegistered: false,
    accountType: req.body.accountType,
    password: req.body.password,
    verified: false,
  });

  sendMail(
    req.body.email,
    "Authentication Token",
    process.env.AUTHENTICATION_TOKEN
  );

  await newUser
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

// Google Registration Page
router.post("/users/register/google", async (req, res) => {
  // Verify the identity of the request
  try {
    const payload = await verify(req.body.idToken);

    const user = {
      email: payload["email"],
      userName: payload["given_name"],
    };

    // Ensure the input meets our requirements
    const { errors, isValid } = await validateLoginInput(user);
    if (!isValid) {
      res.status(401).json(errors);
      return;
    }

    // Creating a new user
    const newUser = new signUpTemplate({
      userName: user.userName,
      email: user.email,
      googleRegistered: true,
      accountType: req.body.accountType,
      verified: true,
    });

    await newUser
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (e) {
    console.log(e);
  }
});

// Verification Page
router.post("/users/register/:id", async (req, res) => {
  // Retrieving the user id
  const user = await signUpTemplate.findOne({
    userName: req.params.id,
  });

  if (!user) {
    res.status(401).json({ userName: "Invalid" });
  }

  if (user.accountType === "User") {
    if (req.body.authid === process.env.AUTHENTICATION_TOKEN) {
      user.verified = true;
      user.save();
      res.status(200).json({ verified: "Account verified" });
      return;
    } else {
      res.status(401).json({ token: "Invalid Token" });
      return;
    }
  }

  if (user.accountType === "ServiceProvider") {
    const serviceProvider = await stallTemplate.findOne({
      venueID: req.body.authid,
    });

    if (!serviceProvider) {
      res.status(401).json({ serviceProviderID: "Invalid" });
      return;
    }

    user.verified = true;
    user.serviceProviderID = req.body.authid;
    user.save();
    res.status(200).json({ verified: "Account verified" });
    return;
  }
});

// Flush out all users
router.post("/users/clear", (req, res) => {
  signUpTemplate
    .deleteMany({})
    .then(function () {
      res.json({ status: "success" });
    })
    .catch(function () {
      res.status(400);
    });
});

module.exports = router;
