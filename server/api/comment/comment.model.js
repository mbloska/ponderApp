'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({    
  comment: String, // comment message 
  post: String, //post id to link comment to message
  side: String, //comment side to the quesdtion
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  upvotes: {type: Number, default: 0} //as defult set to 0 
});

module.exports = mongoose.model('Comment', CommentSchema);