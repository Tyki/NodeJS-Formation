const express = require('express')
const calculatriceController = require('./controllers/calculatriceController')
const app = express()

app.get('/:number1/:number2', function (req, res) {
  return calculatriceController.doAddition(req, res)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})