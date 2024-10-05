const express = require('express');
const cors = require('cors');
const router = require('./routes/router');

const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app logger
app.use((req, res, next) => {
  console.log(`${new Date()} -- URL: ${req.url}`);
  next();
});

app.use(router);

app.listen(PORT, () => {
  console.log('##########################');
  console.log(`- Running in ${NODE_ENV} mode`);
  console.log(`- Server listening on port ${PORT}`);
  console.log('##########################');
});
