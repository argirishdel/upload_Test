const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helper/APIError');

/**
 * Location Schema
 */
const LocationSchema = new mongoose.Schema({
    store_location:{
      type: String,
      required: true
    },
    entrance_name:{
      type: String,
      required: true
    }
});

/**
 * Statics
 */
LocationSchema.statics = {
  /**
   * Get user
   * @param {String} store_location - The objectId of user.
   * @returns {Promise<Locations[]>}
   */
  getlocations(store_location) {
    return this.find({store_location})
               .exec();
  }
};

/**
 * @typedef Location
 */
module.exports = mongoose.model('Location', LocationSchema);
