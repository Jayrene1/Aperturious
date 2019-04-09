const express = require("express");
const routes = require("./routes")
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;


// Express parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/aperturiousdb");

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
