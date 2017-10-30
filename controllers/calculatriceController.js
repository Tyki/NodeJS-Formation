const calculatriceHelper = require('../helpers/calculatriceHelper')

function doAddition(req, res) {
  const number1 = req.params.number1
  const number2 = req.params.number2

  let result = calculatriceHelper.addition(number1, number2)

  return res.send(result)
}

module.exports = {
  doAddition
}