const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helper/APIError');

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  unique_id: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  mobileNumber: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  emailAddress:{
    type: String
  },
  last_owned_car:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findOne({unique_id:id})
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        //return Promise.reject(err);
        return {};
      });
  },
  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {string} firstname - firstname of user.
   * @param {string} lastname - lastname of user.
   * @param {string} phone - phone of user.
   * @returns {Promise<User[]>}
   */
  getByNameNumber(firstname, lastname, phone){
    return this.find({ firstname, lastname, mobileNumber: phone })
           .exec();
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', UserSchema);
