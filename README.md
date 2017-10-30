# Allons plus loin

Maintenant que l'on voit comment fonctionne une callback, nous allons faire notre propre REST API qui va faire une calculatrice

Pour cela, nous allons avoir besoin de `Express`. Il s'agit d'un framework qui permet de déclarer des routes HTTP et de fournir un résultat.

## Premier étape, Express 

On recommence, on va créer un package.json. Je vous laisse le créer :)

## Deuxième étape, déclarer la route ! 

Il va falloir écrire le code pour déclarer notre nouvelle route.
Créez un fichier index.js dans lequel nous allons mettre ce code : 

```
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
```

et on teste ! 

> Ca plante, pourquoi ?!

Express, en opposition à fs, n'est pas une librairie fournie avec NodeJS. Nous devons l'installer, c'est la qu'entre en jeu le package.json

Nous allons ajouter express à nos dépendances : 

`npm install --save express`

le --save permet d'indiquer à npm qu'il doit sauvegarder la dépendance fraichement installée dans le package.json.

Vous devriez avoir un dossier node_modules qui contient la librairie de Express. Supprimons la.
Maintenant vous avez votre `package.json`, mais pas les dépendances de votre projet. 

Refaites un `npm install` sans autre argument. NPM va aller installer lire les dépendences de votre fichier package.json et installer toutes les dépendances de votre projet

## OK, maintenant ca fonctionne ! 

Maintenant que notre serveur tourne, écrivons le code de notre calculatrice

Rajouter ce code à la fin du fichier
```
var calculatrice = function (a, b) {
  return a + b 
}

console.log(calculatrice(2, 3))
```

Rien de fou, on déclare une fonction qui va faire l'addition de deux nombres.
On vérifie que ca marche, vous devriez avoir un '5' qui apparait dans la console

## On modifie notre route pour avoir des query parameters

On va faire en sorte que ce soit dynamique ! Rajoutons des parametres à notre route. Modifiez le code de la route comme ceci : 

```
app.get('/:number1/:number2', function (req, res) {
  ...
 }
```

Pour récuperer les parametres, ils se trouvent dans `req.params`.

Exercice : faire en sorte que ca affiche le resultat de l'addition dans le retour de l'appel 
