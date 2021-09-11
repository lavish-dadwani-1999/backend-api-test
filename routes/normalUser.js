var express = require('express');
const Auth = require('../middleware/auth');
const Bug = require('../models/Bug');

var router = express.Router();

router.patch('/updatestatus/:id', Auth, (req, res) => {
  var id = req.params.id;
  var user = req.user;
  var body = req.body;
  if (!id) return res.status(404).send('Enter id');
//   if (!body.ticket_status) return res.status(404).send('Enter Status');
  Bug.updateOne({ _id: id }, { ...req.body }).then((responce) => {
    if (!responce) return res.status(404).send('bug Not Found');
    res.status(201).json({responce });
  }).catch(err=>{
      console.log(err)
      res.status(500).send("server error ")
  })
});

router.get('/allbugs', Auth, (req, res) => {
  var user = req.user;
  Bug.find({ user: user._id })
    .then((responce) => {
      if (!responce) return res.status(400).send('user not Found');
      res.status(200).json({ responce });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('server error');
    });
});

module.exports = router;
