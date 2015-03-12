var express = require('express')
    multer = require('multer'),
    bodyParser = require('body-parser');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'HANA Migration Tool' });
});

router.get('/home', function(req, res) {
    res.render('home');
});

router.get('/data/home', function(req, res) {
    // TODO: 
});

router.get('/history', function(req, res) {
    res.render('history');
});

router.get('/data/history', function(req, res) {
});

router.get('/queue', function(req, res) {
    res.render('queue');
});

router.get('/data/queue', function(req, res) {
});

router.get('/template/pool', function(req, res) {
    res.render('pool');
});

router.post('/file', multer({ 
    dest: './uploads',
    inMemory: true
}), function(req, res) {
    
    console.log(req.body);
    console.log(req.files);

    var file = req.files.sourceCompanies.buffer,
        names = [];

    file.toString().split(/[^\w]+/).forEach(function(name) {
        // TODO: validate name
        if (name) {
            names.push(name);
        }
    });

    res.set('content-type', 'text/html');
    // res.send(names.toString());
    res.send(names);
});

router.post('/migrate', bodyParser.urlencoded({ extended: false }), function(req, res) {
    console.log(req.body);
    res.send({
        status: 'OK'
    });
});

module.exports = router;
