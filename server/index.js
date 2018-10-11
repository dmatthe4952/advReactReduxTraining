//main starting point of the application.
const express = require('express');
const http = require('http');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./router');
const ModelClass = require('./models/user');
const cors = require('cors');

//App setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type:"*/*"}));
router(app);

mongoose.connect("mongodb://localhost/auth",{useNewUrlParser:true});

//Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on port: ",port);
