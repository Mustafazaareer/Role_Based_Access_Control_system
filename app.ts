import './config.js';
import createError from 'http-errors';
import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.js';
import permissionsRouter from './routes/permissions.js';
import rolesRouter from './routes/roles.js';
import  './db/dataSource.js';
import { authenticate } from './middlewares/auth/authenticate.js';


var app = express();

const PORT = 5000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users',usersRouter);
app.use('/permissions' ,permissionsRouter);
app.use('/roles', rolesRouter);




app.use((req, res, next) => {
  next(createError(404));
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;
