/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var thing = require('./thing.model');

exports.register = function(socket) {
  thing.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  thing.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/*function onSave(socket, doc, cb) {
  socket.emit('thing:save', doc);
}*/

// call populate() to expand user on update notification through websockets
function onSave(socket, doc, cb) {
  doc.populate('user', 'name', function(){
    socket.emit('thing:save', doc);    
  })
}

function onRemove(socket, doc, cb) {
  socket.emit('thing:remove', doc);
}