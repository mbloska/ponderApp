'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*
var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});
*/

var ThingSchema = new Schema({
  name: String, /* message */
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  side: [],
  createdAt: {
    type: Date,
    default: Date.now
  },
  upvotes: {type: Number, default: 0},
  category: [], // make it so tags added are , seperated 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // when user adds comment push to array here!
});

module.exports = mongoose.model('Thing', ThingSchema);