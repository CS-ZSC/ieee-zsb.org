var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

var mongoURI = process.env.MONGO_URI;
var dataWarehouse = process.env.DWH_URI;
var dwhDbURI = (db) => dataWarehouse + '/' + db + '?authSource=admin';
var collection = "testing";

exports.warehouse = {
  insertDoc: function(db, collection, doc, callback) {
    MongoClient.connect(dwhDbURI(db), function(err, db) {
      if (err) {
        callback(err, db);
      } else {
        db.collection(collection).insertOne(doc, function(err, result) {
          if (err) {
            callback(err, db);
          } else {
            callback(null, db);
          }
        });
        db.close();
      }
    });
  }
};

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
              callback(null, db, result.insertedId);
            }
          });
        }
      });
    }
  });
}

exports.confirm = function(id, callback) {
  MongoClient.connect(mongoURI, function(err, db) {
    if (err) {
      callback(err, db);
    } else {
      db.collection(collection).findOne({'_id': new ObjectId(id)}, function(err, doc) {
        if (err) {
          callback(err, db);
        } else if (doc.confirmed == true) {
          callback('Already confirmed', db);
        } else {
          db.collection(collection).update({'_id': new ObjectId(id)}, {$set: {confirmed: true}}, function(err, count) {
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
