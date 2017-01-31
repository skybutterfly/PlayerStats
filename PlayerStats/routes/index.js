var express = require('express');
var router = express.Router();
var ps = require('../player-stats.json');
var x = ps.players;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'Players cards',
      el: x
  });
});

module.exports = router;
