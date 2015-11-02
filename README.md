# panoptik

> A personal homepage thing.

* * *

**panoptik** is an educational project, which will be used for node.js courses.

**Note:** the school where the course is given, the [HEPL](http://www.provincedeliege.be/hauteecole) from Liège, Belgium, is a french-speaking school. From this point, the instruction will be in french. Sorry.

* * *

## Environnement Docker

Voici la procédure & les commandes pour faire tourner le projet *via* [docker](https://www.docker.com/).

### 0. Prérequis

Ça devrait déjà être le cas, mais assurez-vous d'avoir [VirtualBox](https://www.virtualbox.org/) sur votre machine.

### 1. Installation des dépendances

1. Le traditionnel `npm install` à l'intérieur du dossier installera tout ce dont on a besoin.

### 2. Docker Toolbox

1. Téléchargez & installez la [dernière version de docker toolbox](https://github.com/docker/toolbox/releases) (note, quand l'installer vous demande de choisir un outil pour démarrer, vous pouvez zapper l'étape).
1. Pour vérifier votre installation, tapez les commandes `docker --version`, `docker-compose --version` & `docker-machine --version` dans votre terminal.

### 3. docker-machine

1. Créez une machine de développement avec la commande `docker-machine create --driver virtualbox dev` (ça peut prendre un peu de temps).
1. Vous pouvez vérifier l'existence de votre machine avec la commande `docker-machine ls`. Le nom de notre machine est "*dev*". Si son statut n'est pas "running", démarrez-la avec la commande `docker-machine start dev`.
1. Il nous faut ensuite lier notre machine avec notre terminal courrant, en tapant les commandes suivantes : `docker-machine env dev`, suivi par une commande qui vous est suggérée et qui ressemble à `eval "$(docker-machine env dev)"` sur mac, et `eval "$(C:\Programe Files\Docker Toolbox\docker-machine.exe)"` sur windows (note: selon le shell que vous utilisez sur windows, vous devrez peut-être utiliser les [commandes alternatives indiquées dans la doc](https://docs.docker.com/machine/reference/env/)).
1. Utilisez la commande `docker-machine ip dev` pour connaître à tout moment l'ip de notre machine.

### 4. docker-compose

1. Depuis le dossier de notre projet, générez les containers en utilisant la commande `docker-compose build` (ça peut prendre un peu de temps la première fois).
1. Ensuite, lancez les containers avec `docker-compose up -d` (qui peut prendre aussi du temps la première fois).
1. Pour terminer, liez les logs conteneurs lancés à votre terminal via la commande `docker-compose logs app`  
	> Vous devriez voir apparaître des lignes ressemblant aux suivantes :  
    > `app_1 | 2 Nov 10:51:06 - [panoptik:server] launching...`  
	> `app_1 | 2 Nov 10:51:08 - [panoptik:server] took 1.8s. `

### 5. Accéder à l'application

1. Dans un navigateur, allez à l'adresse correspondant à l'IP de votre *docker-machine*. Votre terminal devrait afficher les logs de connexion, et votre navigateur une page affichant sobrement "**panoptik**"

### 6. Fermer/relancer le tout

1. Pour quitter les logs, utiliser le classique `ctrl+c` pour quitter le processus.
1. Éteignez et relancer les container docker via `docker-compose stop` et `docker-compose up -d`
1. Éteignez et relancer la machine docker via `docker-machine stop dev` et `docker-machine start dev`. N'oubliez pas que pour chaque fenêtre du terminal ouverte, vous devez lier docker machine avec les commandes indiquées dans le **point 3.3**.

* * *