var express = require('express');
var user_routes = require('./routes/user');
var bug_routes = require("./routes/bug")
var dotenv = require("dotenv")
var normal_routes = require("./routes/normalUser")
dotenv.config()
var app = express();
require('./db.js');

console.log(process.env.SOMES_ENV);

app.use(express.json());


app.use(user_routes);
app.use(bug_routes)
app.use(normal_routes)
app.get('/', (req, res) => {
  res.send(req.body);
});

app.listen(3000);
