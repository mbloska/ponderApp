/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./comment.model');

exports.register = function(socket) {
  comment.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  comment.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/*function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}*/

// call populate() to expand user on update notification through websockets
function onSave(socket, doc, cb) {
  doc.populate('user', 'name', function(){
    socket.emit('comment:save', doc);    
  })
}

function onRemove(socket, doc, cb) {
  socket.emit('comment:remove', doc);
}