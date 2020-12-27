const express = require("express");
const router = express.Router();
const Uber = require("../models/uber");

// get a list of ubers from the db
router.get("/ubers", function (req, res, next) {
  /* Uber.find({}).then(function(ubers){
        res.send(ubers);
    }); */
  Uber.geoNear(
    {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    },
    { maxDistance: 100000, spherical: true }
  )
    .then(function (ubers) {
      res.send(ubers);
    })
    .catch(next);
});

// add a new uber to the db
router.post("/ubers", function (req, res, next) {
  Uber.create(req.body)
    .then(function (uber) {
      res.send(uber);
    })
    .catch(next);
});

// update a uber in the db
router.put("/ubers/:id", function (req, res, next) {
  Uber.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      Uber.findOne({ _id: req.params.id }).then(function (uber) {
        res.send(uber);
      });
    })
    .catch(next);
});

// delete a uber from the db
router.delete("/ubers/:id", function (req, res, next) {
  Uber.findByIdAndRemove({ _id: req.params.id })
    .then(function (uber) {
      res.send(uber);
    })
    .catch(next);
});

module.exports = router;
