const express = require('express')
const app = express()

app.get('/:number1/:number2', function (req, res) {
  var result = calculatrice(parseInt(req.params.number1), parseInt(req.params.number2))

  res.send(result.toString())
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

var calculatrice = function (a, b) {
  return a + b 
}
