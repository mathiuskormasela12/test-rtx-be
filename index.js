const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

// routes 
const routes = require('./routes/index.js');

const port = config.service.port || 3000;

// 1. Set up the express app
const app = express();

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup Cors
app.use(cors())

// 2. Require our routes into the application.
app.use('/api', routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

// 3. Server listen to port
app.listen(port, () => {
  console.log(`The RESTful API is being run at ${port}`);
});

module.exports =  app;