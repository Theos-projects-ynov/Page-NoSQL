# Form Piece

## Description

Ce projet est un formulaire en ligne qui permet de créer des formulaires de les
modifier,suppriméer et surtout les remplir.

Il est composé de deux parties : une partie front et une partie back.

## Installation

#### Front

Aller dans le projet front `cd .\front\` faire `npm i` puis `npm start`

#### Back

- Aller dans le projet back `cd .\back\` faire `npm i`
  [Image de l'installation réussit](ReadmeImg/img.png)
- Si vous n'ave pas cette image ou quelque chose de similaire Vérifier votre
  version de NodeJS et installer la même version.
- ensuite, il vous suffit de marque `npm run start`

<details>
    <summary>Pssst : il y a un easteregg caché</summary>
    un easterEgg et caché dans le fichier `package.json` du dossier back
    mais aussi du coté front dans le fichier `package.json` du dossier front
</details>

N'oublier pas le .env a mettre a ce niveau :
[Mettre le .env au niveau de src donc /back/.env](ReadmeImg/oumettredotenv.png)
avec ce model de donnée

```env
JWT_SECRET={mot de passe pour le token secret de jwt}
USERNAMEDB={votre nom de user votre de db}
PASSWORDDB={votre mot de passe de db}
```

## Front

### Technologie

- React
- React-Router
- CSS / SASS
- Authentification : Basée sur des tokens JWT
- Communication avec le Backend : API REST

### Structure du projet

L’application est organisée autour de plusieurs dossiers clés :

#### Pages

Contient les différents fichiers de page (dans le dossier Page), par exemple :

* Login.jsx – Page de connexion.
* Register.jsx – Page d'inscription.
* HomePage.jsx – Page d'accueil qui affiche plusieurs catégories de formulaires.
* Profil.jsx – Page de profil utilisateur avec la liste des formulaires créés.
* MyFormsPage.jsx – Liste des formulaires créés par l’utilisateur.
* CreateForm.jsx & FormCreation.jsx – Interface de création de formulaire.
* FormResponse.jsx – Interface pour répondre à un formulaire.
* FormStats.jsx – Page pour visualiser les statistiques et les réponses.
* FormAnswer.jsx et FormEdit.jsx – Prévisions pour la consultation/modification
  d’un formulaire (actuellement minimalistes).

### Routage

Le routage est défini dans le fichier MainRouter.jsx à l’aide de React Router.
Voici un aperçu des routes principales :

/login
Affiche la page de connexion avec le composant Login et la barre de navigation (
NavBar).

/register
Affiche la page d'inscription via le composant Register avec NavBar.

/
Page d'accueil (HomePage) affichant :

Mes formulaires (formulaires créés par l’utilisateur)
Mes réponses (formulaires auxquels l’utilisateur a répondu)
Tous les formulaires
Accès protégé par le wrapper UserConnected.

* /profil  
  Affiche la page de profil (Profil) contenant la liste des formulaires de
  l’utilisateur. Accès protégé.

* /createform  
  Accès à la page de création de formulaire (CreateForm et FormCreation)
  protégée par UserConnected.

* /myformpage  
  Liste des formulaires de l’utilisateur via MyFormsPage. Accès protégé.

* /form/answer/:id  
  Page de réponse à un formulaire spécifique (FormAnswer). Accès protégé.

* /form/edit/:id  
  Page de modification d’un formulaire (FormEdit). Accès protégé.

* /form/stats/:id  
  Affiche les statistiques et les réponses d’un formulaire (FormStats). Accès
  protégé.

* /form/:id  
  Page permettant de répondre à un formulaire particulier (FormResponse). Accès
  protégé.

Chaque route intégrant NavBar et, pour la plupart, le composant **UserConnected
**
garantit que seules les actions autorisées (pour les utilisateurs connectés)
sont accessibles.

### Services :

Les appels API sont centralisés dans des fichiers de service :

* formService – Fonctions comme getMyForms, getAllForms et submitForm pour gérer
  les formulaires.
* answerService – Fonction getMyAnswer pour récupérer les réponses aux
  formulaires.
* userService – Gestion de l’authentification, par exemple avec la fonction
  login.

### Authentification et Sécurisation

Stockage du Token : Après connexion, le token JWT est sauvegardé dans le
localStorage.
Décodage du Token : Utilisation de jwtDecode pour extraire l’ID et autres
informations de l’utilisateur.
Protection des Routes : Le composant UserConnected enveloppe la plupart des
pages pour vérifier que l’utilisateur est authentifié.

## Partie Back

La partie Back est développée avec Node.js, Express et MongoDB (via
Mongoose).  
Elle gère trois entités principales : **Utilisateurs**, **Formulaires** et
**Réponses**.

### Technologie

- NodeJS (testé avec 2O.11.1 et npm : 10.9.1 )
- Express
- Mongoose

### Structure du projet

#### User (Utilisateur)

* GET /user  
  Récupère tous les utilisateurs.

* POST /user  
  Crée un nouvel utilisateur.

* POST /user/login  
  Authentifie un utilisateur et retourne un token JWT.

#### Form (Formulaire)

* GET /form  
  Récupère tous les formulaires.

* GET /form/:id  
  Récupère un formulaire par son identifiant.

* GET /form/author/:authorid  
  Récupère tous les formulaires créés par un auteur spécifique.

* POST /form  
  Crée un nouveau formulaire.

* PUT /form/:id  
  Met à jour un formulaire existant.

* DELETE /form/deleteAll  
  Supprime tous les formulaires et leurs réponses associées.

* DELETE /form/:id  
  Supprime un formulaire par son identifiant ainsi que les réponses associées.

#### Answer (Réponse)

* GET /answer  
  Récupère toutes les réponses.

* GET /answer/:id  
  Récupère une réponse par son identifiant.

* GET /answer/author/:id  
  Récupère une réponse via l'identifiant de l'auteur du formulaire.

* GET /answer/form/:id  
  Récupère toutes les réponses associées à un formulaire donné.

* GET /answer/responder/:id  
  Récupère toutes les réponses d'un utilisateur ayant répondu.
  Pour chaque réponse, les données du formulaire associé (champ banner et title)
  sont fusionnées dans le résultat.

* POST /answer  
  Crée une nouvelle réponse.

### Fonctionnalités spécifiques

#### Validation et existence :

Avant la création d'un formulaire ou d'une réponse, le back-end vérifie que les
identifiants (user, form) sont valides et existent dans la base de données.

#### Token JWT :

Lors de la création d'un utilisateur ou de la connexion, un token JWT est généré
et renvoyé. Ce token est utilisé pour authentifier les requêtes ultérieures.

#### Fusion des données :

Dans l'endpoint GET /answer/responder/:id, pour chaque réponse, une requête est
effectuée afin de récupérer les champs banner et title du formulaire associé.  
Ces données sont fusionnées au résultat renvoyé.

### Exemple de requête

Dans cette partie on parlera des requêtes POST pour savoir quelles données et
dans quel format envoyer.

#### User (Utilisateur)

<details>
  <summary> POST /user (clique pour déplier)</summary>

  ```json
  {
  "name": "Snake1",
  "email": "theos123@hotmail.fr",
  "password": "theos123@hotmail.fr",
  "age": 42
}
  ```

</details>  

<details>
  <summary> POST /user/login (clique pour déplier)</summary>

  ```json
{
  "email": "SnakeShader@gmail.com2",
  "password": "123456789"
}
  ```

</details>

#### form (Formulaire)

<details>
  <summary> POST /form (clique pour déplier)</summary>

  ```json
  {
  "name": "Test Form",
  "authorId": "67b708084ff5b0e8d25cd36f",
  "title": "Test titre 0",
  "description": "Test de Description",
  "questions": [
    {
      "id": 0,
      "title": "Qui est le plus beau",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
      "type": "text",
      "placeholder": "Donner un nom",
      "answer": "Théo"
    },
    {
      "id": 1,
      "title": "Qui est le plus beau",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
      "type": "text",
      "placeholder": "Donner un nom",
      "options": [
        {
          "id": 0,
          "name": "Théo",
          "title": "Option 1",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        },
        {
          "id": 1,
          "name": "Nathan",
          "title": "Option 2",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        },
        {
          "id": 2,
          "name": "Quentin",
          "title": "Option 3",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        }
      ],
      "answer": "Théo"
    }
  ]
}
  ```

</details>

<details>
  <summary> PUT /form/:id (clique pour déplier)</summary>

  ```json 
  {
  "name": "Test Form",
  "authorId": "678122d6dd07fba30a9ccc7e",
  "title": "Test titre 0",
  "description": "Test de Description",
  "questions": [
    {
      "id": 0,
      "title": "Qui est le plus beau",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
      "type": "text",
      "placeholder": "Donner un nom",
      "answer": "Théo"
    },
    {
      "id": 1,
      "title": "Qui est le plus beau",
      "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat.",
      "type": "text",
      "placeholder": "Donner un nom",
      "options": [
        {
          "id": 0,
          "name": "Théo",
          "title": "Option 1",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        },
        {
          "id": 1,
          "name": "Nathan",
          "title": "Option 2",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        },
        {
          "id": 2,
          "name": "Quentin",
          "title": "Option 3",
          "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat."
        }
      ],
      "answer": "Théo"
    }
  ]
}
  ```

</details>

#### Answer (Réponse)

<details>
  <summary> POST /answer (clique pour déplier)</summary>

  ```json 
    {
  "responderId": "67b733b2bd3c8f9b9434b8e4",
  "formId": "67b7570adc820d013cc95777",
  "auhtorFormId": "67b733b2bd3c8f9b9434b8e4",
  "questions": [
    {
      "id": 0,
      "userAnswer": "Théo",
      "answer": "Théo"
    },
    {
      "id": 1,
      "userAnswer": "Théo",
      "answer": "Nathan"
    }
  ]
}
  ```

</details>

## Conclusion

Le projet Form Piece offre une solution complète pour la création, la
modification, la suppression et le remplissage de formulaires en ligne.  
Organisé en deux parties distinctes — un front-end développé en React et un
back-end en Node.js avec Express et MongoDB — le système garantit une expérience
utilisateur fluide et sécurisée grâce à l'utilisation de JWT pour l'
authentification et d'une architecture API REST bien structurée.



