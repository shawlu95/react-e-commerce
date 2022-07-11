require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const stripeController = require('./controllers/stripeController');

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api/ping', (req, res) => {
  return res.send('pong');
});

app.post('/api/stripe', stripeController);

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
