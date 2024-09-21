import express, { json } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ 1: 'hello', 2: 'world!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
