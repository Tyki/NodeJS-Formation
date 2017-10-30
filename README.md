# Et si on attaquait? 

Premier étape, nous allons découvrir le coté asynchrone de NodeJS. Dans le dossier `async`, vous avez à disposition un fichier texte plutot lourd qui va etre long d'ouvrir et afficher.

> Nous allons ouvrir et lire le fichier et afficher un "J'ai fini de lire" à la fin du script.

Pour ouvrir et lire, nous allons utiliser la libraire "fs" de node.Js

## Première étape : ajouter 'fs' à nos dépendances.

Pour ca, il nous faut l'équivalent du composer.json / lock

NPM nous permet facilement de créer notre fichier de dépendances. Faites un 
 `$ npm init -y` 
dans le dossier async pour generer un fichier **composer.json** qui va contenir la liste de toutes les dépendances / dev-dépendances

## Deuxième étape : utiliser la librairie fs

Créer un fichier index.js dans le dossier async.

Pour utiliser la librairie, il faut déclarer en haut du fichier js qu'elle est nécessaire. Pour faire cela, nous allons faire un `require('fs');`

et écrire ce code : 

```
const fs = require('fs');

fs.readFile('lorem-ipsum.txt', function(error, data) {
  if (error) {
    console.error(error)
  }

  console.log(`J'affiche mon résultat`)
  console.log(data.toString('utf-8'))
})

console.log(`J'ai fini ! `)
```

On va décortiquer ce bout de code ensemble.
Volontairement, je ne parlerai pas de readFileSync.

Corrigez ca pour que le "J'ai fini!" s'affiche après les données