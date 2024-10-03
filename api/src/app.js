const express = require('express');

const app = express();
const PORT = process.env.PORT || 3002;
const MODE = process.env.NODE_ENV || 'development';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.body);
  console.log(`${new Date()}: ${req.body}`);
  next();
});

app.get('/', (req, res) => {});

app.listen(PORT, () => {
  console.log('##########################');
  console.log(`- Running in ${MODE} mode`);
  console.log(`- Server listening on port ${PORT}`);
  console.log('##########################');
});
