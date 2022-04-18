// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
  //console.log(server);
  console.log(`running on my localhost: ${port}`);
};

// GET route
app.get('/retProjectDataToUI', retData);

function retData(request, response) {
  console.log("request");
  console.log(projectData);
  response.send(projectData);
};

app.post('/addProjectData', addProjectData);

function addProjectData(req, res) {
  let body_sent = req.body;
  //let newentry={temp:body_sent.temp,date:body_sent.date,content:body_sent.content}; 
  console.log("inside addProjectData");
  //console.log(req.body);
  //projectData.push(newentry);
  projectData = { temp: body_sent.temp, date: body_sent.date, content: body_sent.content }
  console.log(projectData);
};
