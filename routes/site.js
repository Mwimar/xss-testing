const express = require("express");

const bcrypt = require("bcryptjs");

const xss = require("xss");

const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/discussion");
});

router.get("/discussion", async function (req, res) {
  const comments = await db.getDb().collection("comments").find().toArray();
  console.log("Comments before rendering template:", comments);

  res.render("discussion", { comments: comments });
});

router.post("/discussion/comment", async function (req, res) {
  const comment = {
    text: xss(req.body.comment),
  };
  await db.getDb().collection("comments").insertOne(comment);
  res.redirect("/discussion");
});

module.exports = router;
