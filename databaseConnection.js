const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URI;

  mongoose.connect(DB_URL, {
    //Performance Enhancement
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  //Checking Error/Success States

  //Error
  db.on("error", console.error.bind(console, "Connection Error in Mongoose:"));

  //Success (Opens once Successfully ) ie Open to Connection
  db.once("open", () => {
    console.log("Connection Successful in Mongoose");
  });
}

module.exports = DbConnection;
