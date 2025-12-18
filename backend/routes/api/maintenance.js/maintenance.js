var router = require("express").Router();
var mongoose = require("mongoose");
var auth = require("../auth");

router.get("/", auth.optional, function(req, res, next) {
  var query = {};
  var limit = 100;
  var offset = 0;
  return res.json({'Maintenance': null});
});

module.exports = router;