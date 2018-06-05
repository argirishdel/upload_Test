const User = require('../models/user');
const Location = require('../models/location');

function findUserById(req, res, next){
  const id = req.params.id;
  User.get(id)
      .then((user)=>{
        res.json(user);
      })
      .catch(e => next(e));
}

function findUserByDetails(req,res,next){
  const param = req.body;
  
  // find whether body contains unique id else check for other params
  if(param.hasOwnProperty('unique_id')){
    //check whether it is empty or not
    if(param.unique_id){
        User.get(param.unique_id)
            .then((user)=>{
              res.json(user);
            })
            .catch(e => next(e));
    }
    else{
      try{
        if(param.hasOwnProperty('firstname') && param.hasOwnProperty('lastname') && param.hasOwnProperty('mobileNumber')){
          const firstname = param.firstname;
          const lastname = param.lastname;
          const mobileNumber = param.mobileNumber;
          User.getByNameNumber(firstname, lastname ,mobileNumber)
              .then(users => res.json(users))
              .catch(e => next(e));
        }
        else{
          res.status(500).json({error:"either unique id or firstname, lastname and mobilenumber are madatory"});
        }
        const firstname = param.firstname;
      }
      catch(e){
          res.status(500).json(e.message);
      }
    }
  }
}

function getStoreEntrances(req, res, next){
  try{
    const store_location = req.params.store_location;
    return Location.getlocations(store_location)
                   .then((loc)=>{
                     res.json(loc);
                    })
                   .catch(e => next(e));
  }
  catch(e){
    res.status(500).json(e.message);
  }

}

module.exports = {findUserById, findUserByDetails, getStoreEntrances};