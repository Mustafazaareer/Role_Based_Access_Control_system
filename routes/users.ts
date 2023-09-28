import express from 'express';
import { getUsers, insertUser} from '../controllers/user.js';
import {login} from "../controllers/user.js"
import { authenticate } from '../middlewares/auth/authenticate.js';
import { authorize } from '../middlewares/auth/authorize.js';


var router = express.Router();

router.post('/',authenticate,authorize("POST_user"),(req, res, next) => {
  insertUser(req.body).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.get('/get',authenticate,authorize("GET_user"),(req, res, next) => {
  getUsers(req.body.userName).then((data) => {
    res.send(data)
  }).catch(err => {
    console.error(err);
    res.status(500).send(err);
  });
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  login(email, password)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(401).send(err);
    })
});



export default router;
