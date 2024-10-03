const express = require('express');
const router = require('./routes/router');

const PORT = process.env.PORT || 3002;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
