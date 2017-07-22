'use strict';
const express = require('express');
const router = express.Router();
const knex = require('../../db').knex;

router.route('/')
  .get((req, res) => {
    res.status(200).send('Hello World!');
  })
  .post((req, res) => {
    console.log('in the correct route');
    res.status(201).send({ data: 'Posted!' });
  });

router.route('/profileInfo')
  .get((req, res) => {
    const userInfo = req.user;
    console.log('user info', userInfo);

    knex.select().table('profiles')
      .then(rows => {
        console.log(rows);
        res.status(200).json(rows);  
      })
      .catch(err => res.status(500).send(err));
  });

module.exports = router;
