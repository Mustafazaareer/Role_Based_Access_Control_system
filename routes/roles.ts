import express from 'express';
import {insertRole} from '../controllers/role.js';
var router = express.Router();




router.post('/role', (req, res, next) => {
  insertRole(req.body).then((data) => {
    res.status(201).send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});




export default router;
