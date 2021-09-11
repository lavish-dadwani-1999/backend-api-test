var express = require('express');
var user_routes = require('./routes/user');
var bug_routes = require("./routes/bug")
var normal_routes = require("./routes/normalUser")
var app = express();
require('./db.js');



app.use(express.json());


app.use(user_routes);
app.use(bug_routes)
app.use(normal_routes)
app.get('/', (req, res) => {
  res.send(req.body);
});

app.listen(3000);
