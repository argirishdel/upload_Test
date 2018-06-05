const express = require('express');
const apiCtrl = require('./api.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.get('/',(req,res)=>{
  res.json({'Hello':'World'});
})

router.get('/find/:id', apiCtrl.findUserById);

router.post('/find',apiCtrl.findUserByDetails);

router.get('/locations/:store_location',apiCtrl.getStoreEntrances);

module.exports = router;