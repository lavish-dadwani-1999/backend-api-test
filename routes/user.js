var express = require('express');
var User = require('../models/User');
var jwt = require('jsonwebtoken');
var router = express.Router();

var key = 'love';

router.post('/register', (req, res) => {
  var body = req.body;

  if (!body.email || !body.password)
    return res.status(404).send('invalid Credentials');
  if (!body.name) return res.status(404).send('Enter Name');
  if (body.password.length < 8)
    return res.status(404).json({ ok: body.password.length });
  var user = new User({ ...req.body });
  jwt.sign(
    { id: user._id },
    key,
    { expiresIn: 1000 * 60 * 10 },
    function (err, token) {
      if (err) res.status(500).send('server error');
      user.token = token;
      user
        .save()
        .then((responce) => {
          res.status(201).json({ user: responce });
        })
        .catch((err) => {
          res.status(500).send('server error');
        });
    }
  );
});

router.post('/login', (req, res) => {
  var body = req.body;
  if (!body.email || !body.password)
    return res.status(404).send('invalid Credentials');
  if (body.password.length < 8)
    return res.status(404).json({ err: 'length should be 8' });
  User.FindByEmailAndPassword(body.email, body.password)
    .then((user) => {
      jwt.sign(
        { id: user._id },
        key,
        { expiresIn: 1000 * 60 * 10 },
        function (err, token) {
            user.token = token
          if (err) res.status(500).send('server error');
          console.log('token', token);
          User.updateOne({ _id: user._id }, { token: token })
            .then((responce) => {
              res.status(201).json({ user:user });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      );
    })
    .catch((err) => {
      if (err === 'User Not Found') return res.status(404).send(err);
    });
});


router.delete('/logout', (req, res) => {
    var authtoken = req.header("Authorization");
    if(authtoken){
        User.findOneAndUpdate({token:authtoken},{token:null}).then(responce=>{
            if(responce) res.status(201).send("log out")
        }).catch(err=>{
            console.log(err)
            res.status(402).send("invalid Credentials")
        })
    }
    else{
        res.status(402).send("invalid credentials")
    }
  });


module.exports = router;
