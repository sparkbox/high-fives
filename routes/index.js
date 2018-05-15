var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var jsonData = require('../data/data.json');

const teamUrl = 'http://localhost:3000/team';
const analyticsUrl = 'http://localhost:3000/analytics';

async function fetchData() {
  const team = fetch(teamUrl).then(r => r.json());
  const analytics = fetch(analyticsUrl).then(r => r.json());
  const promises = await Promise.all([team, analytics]);

  return promises;
}

function hydrateTeamData(teamAndAnalytics) {
  const team = teamAndAnalytics[0];
  const analytics = teamAndAnalytics[1];

  const filteredPeople = team.people.filter(t => {
    // Filter people down to only those who are in
    // the analytics' top posts
    return analytics.topPosts.find(a => a.author === t.id);
  });

  const hydratedPeople = filteredPeople.map(person => {
    // Hydrate each person with an "article" field
    const article = analytics.topPosts.find(a => a.author === person.id);
    delete article.author;
    person.article = article;

    return person;
  }).sort((a, b) => {
    return a.article.views < b.article.views;
  });

  return { people: hydratedPeople };
}

function thing(data) {
  console.log(data[0]);
}

/* GET home page. */
router.get('/', function(req, res, next) {
  fetchData()
    .then((data) => {
      const hydratedData = hydrateTeamData(data);
      res.render('index', { title: 'High ♥ Fives', people: hydratedData.people })
    })
});

module.exports = router;
