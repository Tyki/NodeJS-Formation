# (Re)Structuration du code

## Introduction

Jusqu'à présent nous avons mis tout le code dans un seul fichier. Vous vous en doutez, ca ne se passe jamais comme ca ! 

Globalement, il y a deux écoles pour l'architecture des fichiers : 
- Une organisation par "feature"
- Une organisation par type de fichier

Une organisation par feature, ressemble à ca : 
```
.
├── bdd
│   ├── controller.js
│   ├── helper.js
│   └── repository.js
└── users
    ├── controller.js
    ├── helper.js
    └── repository.js

```

Une organisation par type de fichier ressemble à cela : 

```
├── controllers
│   ├── bddController.js
│   └── userController.js
├── helpers
│   ├── bddHelper.js
│   └── userHelper.js
└── repositories
    ├── bddRepository.js
    └── userRepository.js

```

Personnellement je préfère la version d'organisation par type de fichier, ca permet de savoir exactement ou sont les fichiers. De plus, s'il y à un grand nombre de features, le nombre de dossiers peut tres vite exploser.


# Reprenons notre code

Nous avions tout dans notre fichier `index.js` dans le dossier serveur. 
Le but de cet exercice est de ranger correctement et de réferencer les fonctions utilisées à travers diffèrents fichiers JS

Nous allons déplacer notre fonction calculatrice dans un dossier `helpers/calculatriceHelper.js`

Les routes sont notre point d'entrée. Nous pouvons mettre le fichier javascript `index.js` à la racine du projet ou dans un dossier `lib` (nommé ainsi par convention). Nous allons le mettre à la racine du projet ainsi que le fichier `package.json` qui se trouve toujours à la racine normalement.

Tant qu'à faire, nous allons créer un controller afin que la gestion des routes ne fasse qu'une seule chose : appeller le bon controller et lasiser le travail au controlleur.

Il faut dont créer le dossier `Controllers` et y rajouter un fichier `calculatriceController.js` qui va se charger de prendre en parametre la `requete` et la `reponse`.

Vous devriez vous retrouver avec cette architecture la : 
```
.
├── controllers
│   └── calculatriceController.js
├── helpers
│   └── calculatriceHelper.js
├── node_modules
│   └── .... // Dépendances
├── index.js
├── package.json
└── README.md

```
## Ok, maintenant qui fait quoi?

Nous avons notre architecture qui ressemble à quelque chose, il va falloir réparer ce que nous avons cassé.

On va commencer par le controller.

> Que va faire le controller?

Il va recevoir l'objet `request` et l'objet `response` en parametre, et c'est lui qui va se charger d'appeller le helper pour faire le calcul des parametres.

> Que va faire la callback de la route ?

Elle va simplement retourner le résultat de l'appel au controleur.

> Que va faire le helper?

Il va simplement prendre deux nombres en parametres et rendre le calcul

# C'est parti ! 

De quoi à besoin le controller? Du Helper. 

Pour récuperer le contenu du helper, il est possible de faire un `require();` sur un fichier. En l'occurrence ici, nous allons avoir un `const helper = require('../helpers/calculatriceHelper');`

> Ouai, super, j'ai le contenu de mon fichier, et après?

Dans la variable `helper`, il n'y aura que des fonctions qui auront été **exposées** dans le fichier calculatriceHelper.js.

Pour dire que l'on souhaite que la fonction soit utilisable par d'autres fichiers js, il faut utiliser : 

```
module.exports = {
  maFonction: maFonction
}
``` 

Cela signifie que dans le fichier calculatriceHelper.js exporte (ou expose) la fonction à qui veut l'utiliser.

C'est ce qu'on appelle le *module pattern*. Un WS a été mené par Pierre Cavalet sur ce sujet, dispo dans confluence.

Reprenons le code de notre controller, il va ressembler à cela : 

```
const calculatriceHelper = require('../helpers/calculatriceHelper')

function doAddition(req, res) {
  const number1 = req.params.number1
  const number2 = req.params.number2

  let result = calculatriceHelper.addition(number1, number2)

  return res.send(result)
}
```

Maintenant notre controller est capable d'utiliser la fonction `addition` et de lui fournir les parametres.

# Exercice

Faites la meme chose pour que la fonction callback de la route execute la fonction `doAddition` de notre tout nouveau controlleur. 