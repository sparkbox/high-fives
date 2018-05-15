var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    "topPosts": [
      {
        "author": 1,
        "title": "Friday is Coming! The Scientific Case for Why Programming is so Darned Satisfying",
        "url": "https://seesparkbox.com/foundry/friday_is_coming_the_scientific_case_for_why_programming_is_so_satisfying",
        "views": 1337,
      },
      {
        "author": 4,
        "title": "Designer to Developer",
        "url": "https://seesparkbox.com/foundry/designer_to_developer",
        "views": 9001,
      },
      {
        "author": 3,
        "title": "Building Pattern Libraries in React with Storybook",
        "url": "https://seesparkbox.com/foundry/building_pattern_libraries_in_react_with_storybook",
        "views": 3210,
      },
    ]
  });
});

module.exports = router;
