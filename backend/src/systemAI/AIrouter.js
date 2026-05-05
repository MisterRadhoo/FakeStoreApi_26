const express = require("express");
const classifyReview = require("./AIcontroller");

const AIrouter = express.Router();

AIrouter.post("/review-classify", classifyReview);

module.exports = AIrouter;


