const Twig = require("twig")
const express = require('express')

const controller = require('./controllers/controller')

let app = express();

// This section is optional and used to configure twig. 
app.set("twig options", {
  strict_variables: false
});

// Declare our route and call the controller that will do all the job with callbacks
app.get('/:prenom', function(req, res){
  controller.renderPage(req, res)
});

app.listen(3000);