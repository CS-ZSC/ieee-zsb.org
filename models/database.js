var MongoClient = require('mongodb').MongoClient;

var mongoURI = process.env.MONGO_URI;
var collection = "testing";

exports.insertForm = function(user, callback) {
  MongoClient.connect(mongoURI, function(err, db) {
    if (err) {
      callback(err, db);
    } else {
      db.collection(collection).findOne({email: user.email}, function(err, doc) {
        if (err) {
          callback(err, db);
        } else if (doc) {
          callback('Already registered', db);
        } else {
          db.collection(collection).insertOne(user, function(err, result) {
            if (err) {
              callback(err, db);
            } else {
              callback(null, db);
            }
          });
        }
      });
    }
  });
}
