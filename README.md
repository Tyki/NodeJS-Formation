# NodeJS-Formation

Nous allons vérifier que votre poste possède node.
Pour ca, faites un :

`nvm -h` 

Si vous n'avez NVM, il faut l'installer :
https://github.com/creationix/nvm/blob/master/README.md#installation

Ce package permettra de choisir facilement votre version de Node que vous souhaitez sur votre poste.

Nous allons installer Node 6 : 
`nvm install 6.9.5`

Vous devriez maintenant pouvoir faire un :

`node -v`

$ v6.9.5


`npm -v`

$ 3.10.10

# Le plus simple : un Hello world

Commencons par quelque chose de simple. Nous allons faire le mythique Hello World en nodeJS

Pour ca, créer un fichier index.js. Oui, du JS coté serveur :)
Vous n'avez plus qu'à afficher sur la sortie standard notre "Hello world"

Oui mais comment?
Simplement en faisant un :

`console.log('Hello world');`

Il ne vous reste plus qu'à éxécuter ce script avec Node

`node index.js`

Vous devriez avoir sur la sortie standard : 
> Hello world

Rien de plus simple ! 

# Présentation de NodeJS

NodeJS, qu'est ce que c'est ?

> Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.

On peut en extraire plusieurs mots clés :

> JavaScript runtime built

Pas de compilation du code, il est éxécuté au runtime

> Event-driven model

NodeJS est basé sur un système d'événements qui permettent d'avoir et d'effectuer des cycles de vie en fonction de la vie du code. Ca se rapproche du `addEventListener` que l'on pourrait faire dans du JS front.

> non-blocking I/O model

Avec Apache et PHP, un fork va etre mis en place à chaque requête entrante et le code de la requete entrante sera éxécuté dans ce thread (contexte). NodeJS est éxécuté sur un seul et unique thread. Donc admettons qu'on effectue une tache asynchrone, ce n'est pas envisageable de bloquer les autres traitements afin d'attendre le retour de cet appel. C'est pour cela qu'il s'agit d'un model non bloquant.

![](http://www.techthali.org/wp-content/uploads/2012/07/npm8.png)

**J'insiste sur le fait que NodeJS est ASYNCHRONE. Il faut toujours garder à l'esprit que le code est NON-bloquant**

Nous verrons plus tard comment gêrer ce modele non bloquant qui est diffèrent de PHP qui force le coté synchrone par défaut

> Node.js' package ecosystem

La où on a composer avec packagist en PHP, on retrouve dans l'écosysteme Node  l'outil de gestion de package NPM qui permet de faire comme composer mais dans un projet Nodejs

** Ce n'est pas un framework, c'est un langage**

 ## Pourquoi utiliser NodeJS?

- Pour le coté Asynchrone, NodeJS étant basé sur de l'événementiel, cela correspond parfaitement pour des traitements avec des appels à des webservices par exemple

- Faire des API. Si on compare une API développée en Symfony vs Node (Ce n'est pas un framework), on va avoir une rapidité de par le fait qu'il ne faut pas relancer toute le code PHP pour éxécuter le petit bout d'API.

- Temps réel / websocket, encore une fois par rapport au coté événementiel de la chose
 
 ## Pourquoi ne pas utiliser NodeJS?

 - Des calculs gourmands en CPU

 - Lire / écrire sur le disque. NodeJS est "lent" au niveau des I/O sur le disque

 

 ## Une dernière chose 

 `Node.js n'est pas un framework. Node.js est un environnement très bas niveau. Il se rapproche donc en quelque sorte plus du C que de PHP, Ruby on Rails ou Django. Voilà pourquoi il n'est pas vraiment conseillé aux débutants.
Notez qu'il existe des frameworks web comme Express qui sont basés sur Node.js. Ils nous permettent d'éviter les tâches répétitives qui nous sont imposées par la nature bas niveau de Node.js, mais ils restent quand même plus complexes à utiliser que des langages comme PHP. `

(C) OpenClassRoom


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