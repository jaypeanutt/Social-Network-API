// Add requirements for express and the routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set up the server port using the express app
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Notifies the user that the server is ready, along with the port used
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running, via: http://localhost:${PORT}`);
  });
});