/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /comments              ->  index
 * POST    /comments              ->  create
 * GET     /comments/:id          ->  show
 * PUT     /comments/:id          ->  update
 * DELETE  /comments/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');

// Get list of comments
exports.index = function(req, res) {
  //added populate() function to expand the user object
  Comment.find().sort({_id:-1}).limit(20).populate('user',' name').exec(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Get a single comment
exports.show = function(req, res) {
  //added populate() function to expand the user object
  Comment.findById(req.params.id).populate('user','name').exec(function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  req.body.user = req.user;// <--- added to save user to comments 
  Comment.create(req.body, function(err, comment) {
    console.log(comment);
    if(err) { return handleError(res, err);}
    return res.status(201).json(comment);
  });
};


// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    //on deletion - validate that the posting user and current user are the same 
    if(comment.user.toString() !== req.user._id.toString()){
      return res.send(403);
    }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}