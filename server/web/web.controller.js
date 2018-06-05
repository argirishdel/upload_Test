const Location = require('../models/location');

function getLocations(req, res, next){
  const loc = 'chandigarh';
  Location.getlocations(loc)
          .then((loc)=>{
            res.render('greeting/location',{locations:loc});
          });
}

module.exports = { getLocations };