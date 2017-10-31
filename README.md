# Avant de commencer

Faites : 
```
cd ~/workspace
git clone git@github.com:Tyki/NodeJS-Formation.git
cd NodeJS-Formation
```

Nous allons vérifier que votre poste possède l'executable NodeJS.
Pour cela, faites un :

`nvm -h` 

Si vous n'avez pas encore NVM, il faut l'installer :
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

Commencons par quelque chose de simple. Nous allons faire le mythique Hello World en nodeJS.

Pour cela, créez un fichier index.js. Oui, du JS coté serveur :)
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

NodeJS est basé sur un système d'événements qui permet de réagir et d'effectuer des actions lorsque ces évènements sont déclenchés, soit par le système soit par vous-même, c'est une implémentation du design pattern Observer. Ca se rapproche du `addEventListener` que l'on pourrait faire dans du JS front.

> non-blocking I/O model

Avec Apache et PHP, un fork (processus enfant clone du parent) va etre mis en place à chaque requête entrante et le code de la requête entrante sera éxécuté dans ce thread différent (une sorte de contexte), la conséquence est que chaque processus n'empêche pas les autres de s'éxecuter lorsque ce dernier tourne. NodeJS fonctionne sur un seul et unique thread, chaque traitement long bloquant tel que le parsing d'un fichier JSON ou la lecture d'un fichier bloque les autres tâches. Dans le cadre d'un serveur web, tous les gens appelant le serveur partagent la même instance. Donc admettons qu'on effectue une tache asynchrone, ce n'est pas envisageable de bloquer les autres traitements afin d'attendre le retour de cet appel. C'est pour cela qu'il s'agit d'un model non bloquant.

![](http://www.techthali.org/wp-content/uploads/2012/07/npm8.png)

**J'insiste sur le fait que NodeJS est basé sur un principe d'ASYNCHRONICITE. Il est possible de faire du code bloquant, mais dans un soucis de performances et de cohérence vous DEVEZ dès que possible utiliser des fonctions ASYNCHRONES*

Nous verrons plus tard comment gêrer ce modèle non bloquant qui diffère de PHP, ce dernier fonctionnant généralement et par défaut de manière synchrone.

> Node.js' package ecosystem

La où on a composer avec packagist en PHP, on retrouve dans l'écosysteme Node l'outil de gestion de package NPM qui permet de faire comme composer mais dans un projet Nodejs.

** Ce n'est pas un framework, c'est un langage**

 ## Pourquoi utiliser NodeJS?

- Pour le coté Asynchrone, NodeJS étant basé sur de l'événementiel, cela correspond parfaitement pour des traitements avec des appels à des webservices par exemple. L'architecture évènementielle permet des traitements rapides, vous aurez donc de meilleures performances.

- Faire des API. Si on compare une API développée en Symfony vs Node (Ce n'est pas un framework), on va avoir une rapidité de par le fait qu'il ne faut pas relancer toute le code PHP pour éxécuter le petit bout d'API. Concrètement étant donné que le processus vis et attends des "évènements" la plupart du code est chargé en mémoire, ce qui n'est pas le cas de PHP qui spawn un processus à chaque nouvelle requête.

- Temps réel / websocket, encore une fois par rapport au coté événementiel de la chose.
 
 ## Pourquoi ne pas utiliser NodeJS?

 - Des calculs gourmands en CPU

 - Lire / écrire sur le disque. NodeJS est "lent" au niveau des I/O sur le disque

 

 ## Une dernière chose 

 `Node.js n'est pas un framework. Node.js est un environnement très bas niveau. Il se rapproche donc en quelque sorte plus du C que de PHP, Ruby on Rails ou Django. Voilà pourquoi il n'est pas vraiment conseillé aux débutants.
Notez qu'il existe des frameworks web comme Express qui sont basés sur Node.js. Ils nous permettent d'éviter les tâches répétitives qui nous sont imposées par la nature bas niveau de Node.js, mais ils restent quand même plus complexes à utiliser que des langages comme PHP. `

(C) OpenClassRoom
