const fs = require('fs');

fs.readFile('lorem-ipsum.txt', function(error, data) {
  if (error) {
    console.error(error)
  }

  console.log(`J'affiche mon résultat`)
  console.log(data.toString('utf-8'))

  console.log(`J'ai fini ! `)
})

