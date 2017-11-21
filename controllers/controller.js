const helper = require('../helpers/helper')

function renderPage (req, res) {

  helper.getJsonData(function (wording) {

    // Dont forget to retrieve the param rom the request and insert it in the JSON object
    const prenom = req.params.prenom

    // Inserting it in the object of wording
    wording['prenom'] = prenom

    // Return the templating
    return res.render('index.twig', wording);
  })
}

module.exports = {
  renderPage
}