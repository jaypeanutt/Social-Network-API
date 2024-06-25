// Add requirement for mongoose
const { connect, connection } = require("mongoose");

// Add the connection string utilized to connect to the MongoDB
const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/social_db";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;