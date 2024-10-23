const express = require('express');
const cors = require('cors');
const router = require('./routes/router');

const app = express();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.NODE_PORT || 3001;

const origins = process.env.ORIGINS
  ? process.env.ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: origins,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// request logger
app.use((req, res, next) => {
  console.log(`${new Date().toDateString()} -- ${req.method} : ${req.url}`);
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('##########################');
  console.log(`- Running in ${NODE_ENV} mode`);
  console.log(`- Server listening on port ${PORT}`);
  console.log('##########################');
});
