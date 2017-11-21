# A mort les "callback hell"

La "callback hell" c'est l'enfer de tout programmeur javascript/node.

http://callbackhell.com/

Afin d'éviter ca, les développeurs du moteur Javascript V8 ont inventés les promises.

Une promise (promesse) est une machine à état qui possède 4 états : 
- en cours
- resolue
- rejetée
- acquitée

Une promise est en cours jusqu'a ce que l'appel asynchrone soit terminé.
La promesse passe dans un état résolue/rejetée et acquittée. Elle ne repassera plus jamais à "en cours"

L'idée derrière ces promesses, c'est de promettre du code une fois que l'appel asynchrone sera terminé.

Faisons une comparaison de ce qu'on à vu avec les callbacks.
Avant nous avions ca : 

```
monAppelAsynchrone = function (cb) {
  // Je fais de l'asynchrone
  // Je recupére mes données
  // J'appelle la callback avec les données
}

monAppelAsynchrone(function (data) {
  // Ici, j'ai mes données
})

// Ici je n'aurais jamais mes données (en faisant de l'asynchrone)
```

Maintenant nous aurons ca :
```
monAppelAsynchrone = function () {
  //Notez qu'il n'y a plus besoin de fonction de callback

  return new Promise((resolve, reject) => {
    // Je fais de l'asynchrone
    // Je récupere mes données
    // Je résoud ma promesse avec les données
    return resolve(...)
  })
}

monAppelAsynchrone()
.then((données) => {
  // Ici j'ai mes données
})
```

Je fais une promesse qu'il y aura des données envoyées au retour de l'appel asynchrone.
Une fois que la promesse est tenue et resolue, le moteur va éxécuter le code qui se trouve dans le `.then`

> Ok et la gestion d'erreur alors?

La gestion d'erreur se fait *presque* de la meme facon. Nous allons modifier l'appel asynchrone plus haut : 
```
monAppelAsynchrone = function () {
  //Notez qu'il n'y a plus besoin de fonction de callback

  return new Promise((resolve, reject) => {
    // Je fais de l'asynchrone
    // Je récupere mes données
    // Je résoud ma promesse avec les données

    if (error) {
      // Je gere mon erreur
      return reject(error)
    }

    return resolve(...)
  })
}

monAppelAsynchrone()
.then((données) => {
  // Ici j'ai mes données
})
.catch((error) => {
  // Ici j'ai mon erreur
})
```

Les erreurs se gerent avec un `.catch`. Lorsqu'une promise est rejetée (gestion de cas d'erreurs par exemple), le moteur Javascript va jeter (throw) l'erreur au prochain `catch()` présent dans le code. Ce qui permet d'avoir des gestion d'erreur.

> Et si je dois faire plusieurs appels asynchrone à la suite?

Une promesse est chainable. Il est donc possible de faire quelque chose de ce genre : 
```
monAppelAsynchrone = function () {
  //Notez qu'il n'y a plus besoin de fonction de callback

  return new Promise((resolve, reject) => {
    // Je fais de l'asynchrone
    // Je récupere mes données
    // Je résoud ma promesse avec les données

    if (error) {
      // Je gere mon erreur
      return reject(error)
    }

    return resolve(...)
  })
}

// J'ai besoin des données du premier appel asynchrone
monSecondAppelAsynchrone = function (données) {
  return new Promise((resolve, reject) => {
    if (errr) {
      return reject(error)
    }

    return resolve(...)
  })
}

monAppelAsynchrone()
.then((données) => {
  return monSecondAppelAsynchrone(données)
})
.then((secondResultat) => {
  console.log(secondResultat)
})
.catch((error) => {
  // Ici j'ai mon erreur
})
```

Plusieurs choses ici : 
- Les promises sont chainées : "Je promet qu'une fois que la premiere promesse est résolue, je fais la seconde promesse". 
- Il n'y à qu'un seul catch alors qu'il y à deux appels asynchrone : en rejetant une promesse, **l'erreur sera remontée au premier catch rencontré**. 

Ca implique deux choses : 
- Soit il faut uniformiser les cas d'erreurs avant de rejeter la promesse. Permettant ainsi que le code du catch soit le meme pour tout les appels asynchrone.
- Soit il faut faire une gestion d'erreur au cas par cas. Comme évoqué plus haut, l'erreur est remontée autour du premier catch. S'il est nécessaire d'avoir une gestion d'erreur au cas pas cas, il est possible de faire ce code : 

```
monAppelAsynchrone()
.then((données) => {
  return monSecondAppelAsynchrone(données)
})
.catch((error) => {
  // Ici je gerer l'appel de mon premier appel asynchrone

  // ATTENTION : les promesses sont chainées. Le moteur va executer le code du premier catch et ensuiter enchainer avec un eventuel .then s'il y en a un.
})
.then((secondResultat) => {
  console.log(secondResultat)
})
.catch((error) => {
  // Ici j'ai mon erreur de mon seocnd appel asynchrone
})
```

C'est rare et plus lourd de faire de la gestion au cas par cas avec les promises qui sont forcement chainées

# A vous de jouer

Maintenant que vous savez faire une promesse, reprenez le code de l'exercie 4 (branche `exo4-fix`) et transformez les callbacks en promesse de façon à faire un code propre et lisible en promesses.

Attention : il est interdit d'avoir des promises de ce genre : 
```
promise
.then(() => {
  .then(() => {

  })
})
```

Il faut que ce soit : 

```
promise
.then(() => {

})
.then(() => {
  
})
```