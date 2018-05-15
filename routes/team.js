var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    "people": [
      {
        "name": "Katy Bowman",
        "id": 1,
        "heShePronoun": "she",
        "hisHerPronoun": "her",
        "image": "/assets/images/katy.jpg",
      },
      {
        "name": "Ethan Muller",
        "id": 2,
        "heShePronoun": "he",
        "hisHerPronoun": "his",
        "image": "/assets/images/ethan.jpg",
      },
      {
        "name": "Patrick Fulton",
        "id": 3,
        "heShePronoun": "he",
        "hisHerPronoun": "his",
        "image": "/assets/images/patrick.jpg",
      },
      {
        "name": "Heather Taylor",
        "id": 4,
        "heShePronoun": "she",
        "hisHerPronoun": "her",
        "image": "/assets/images/heather.jpg",
      }
    ]
  });
});

module.exports = router;
