var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'HANA Migration Tool' });
});

router.get('/home', function(req, res) {
    res.render('home');
});

router.get('/history', function(req, res) {
    res.render('history');
});

router.get('/queue', function(req, res) {
    res.render('queue');
});

router.get('/template/pool', function(req, res) {
    res.render('pool');
});

module.exports = router;
