const fs = require('fs');

function getJsonData (callback) {
  // Asynchronously reading the JSON file
  fs.readFile('/home/gara/workspace/NodeJS-Formation/static/wording.json', function (error, data) {
    if (error) {
      // There is an error, returning an empty object
      console.error(error)
      return {}
    }

    // Return the content of the file as a JSON object
    var wording = JSON.parse(data.toString())

    // Now that our asynchronus task is done, callback the caller and give him informations
    return callback(wording)
  })
}

module.exports = {
  getJsonData
}