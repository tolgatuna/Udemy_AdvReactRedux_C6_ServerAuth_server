// Main starting point of the application
// Import in ES5
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();      // We create an instance of express

// ## DB SETUP ##
mongoose.connect('mongodb://192.168.20.73:auth/auth');

// ## APP SETUP ##
// Middleware of express declarations :
// Any incoming request will pass into morgan and bodyParser
app.use(morgan('combined'));                // Morgan: Logging framework (using for debugging)
app.use(cors());                            // Cors Middleware is added for enabling accessing the server from any client (Different addresses and ports)
app.use(bodyParser.json({type: '*/*'}));    // bodyParser: use for parse incoming request and ve say parse coming request as json
router(app);

// ## SERVER SETUP ##
const port = process.env.PORT || 3090;  // Port setup
const server = http.createServer(app);  // Create an http server with express
server.listen(port);                    // Give port of server
console.log('Server is listening port:', port);