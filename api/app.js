import express from 'express';

const app = express();
const PORT = process.env.PORT || 3002;
const MODE = process.env.NODE_ENV || 'development';
const DATABASE = process.env.DATABASE || './dev.db';

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 1: 'hello', 2: 'world!' });
});

app.listen(PORT, () => {
  console.log('##########################');
  console.log(`- Running in ${MODE} mode`);
  console.log(`- Using database at ${DATABASE}`);
  console.log(`- Server listening on port ${PORT}`);
  console.log('##########################');
});
