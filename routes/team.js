var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    "people": [
      {
        "name": "Katy Bowman",
        "firstName": "Katy",
        "lastName": "Bowman",
        "id": 1,
        "image": "/assets/images/katy.jpg",
      },
      {
        "name": "Ethan Muller",
        "firstName": "Ethan",
        "lastName": "Muller",
        "id": 2,
        "image": "/assets/images/ethan.jpg",
      },
      {
        "name": "Patrick Fulton",
        "firstName": "Patrick",
        "lastName": "Fulton",
        "id": 3,
        "image": "/assets/images/patrick.jpg",
      },
      {
        "name": "Heather Taylor",
        "firstName": "Heather",
        "lastName": "Taylor",
        "id": 4,
        "image": "/assets/images/heather.jpg",
      }
    ]
  });
});

module.exports = router;
