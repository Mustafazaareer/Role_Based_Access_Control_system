import express from 'express';
import {  insertPermission } from '../controllers/permission.js';
var router = express.Router();



router.post('/permission', (req, res, next) => {
  insertPermission(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


export default router;
