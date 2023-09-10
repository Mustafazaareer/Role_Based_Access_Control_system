import express from 'express';
import { insertUser} from '../controllers/user.js';

var router = express.Router();

router.post('/', (req, res, next) => {
  insertUser(req.body).then(() => {
    res.status(201).send()
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});


export default router;
