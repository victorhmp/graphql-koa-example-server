const env = process.env.NODE_ENV || "development",
  config = require("./config")[env],
  mongoose = require("mongoose");

module.exports = function() {
  mongoose.Promise = global.Promise;
  let db = mongoose.connect(config.db);
  mongoose.connection
    .on("error", function(err) {
      console.log(
        "Error: Could not connect to MongoDB. Did you forget to run `mongod`?"
          .red
      );
    })
    .on("open", function() {
      console.log("Connection extablised with MongoDB");
    });
  return db;
};
