const express = require('express');
const webCtrl = require('./web.controller'); // eslint-disable-line 

const router = express.Router(); // eslint-disable-line new-cap
const bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/', (req, res) => {
  res.render('upload/upload');
});

router.post('/greet', urlencodedParser, (req, res) => {
  console.log(req.body);
  var location = req.body.location;
  res.render('greeting/greet',{location});
});

router.get('/loc',webCtrl.getLocations);

module.exports = router;
