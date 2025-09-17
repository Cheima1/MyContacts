# MyContacts - Projet Fullstack

Projet fil rouge réalisé en **Node.js / Express / MongoDB** (backend) et **React.js** (frontend).  
Déploiement : **Render** (backend) + **Netlify** (frontend).

---

## Objectif
Développer une application web permettant de :
- Créer un compte utilisateur (signup).
- Se connecter et recevoir un **JWT**.
- Ajouter, afficher, modifier et supprimer des **contacts personnels**.
- Protéger les routes avec une authentification **token JWT**.

---

## Stack technique
### Backend
- Node.js + Express
- MongoDB Atlas (via Mongoose)
- Authentification JWT (jsonwebtoken)
- Sécurité des mots de passe (bcrypt)
- Déployé sur **Render**

### Frontend
- React.js
- Fetch API pour communiquer avec le backend
- Gestion basique du token dans l’état local
- Déployé sur **Netlify**

---

## Structure du projet

MyContacts/
│── backend/ # API Express (auth + contacts)
│── mycontact-react/ # Frontend React
│── .gitignore
│── README.md # Ce fichier (global)


Chaque dossier possède également son propre `README.md` pour plus de détails.

---

## Installation et lancement

### 1. Cloner le projet

git clone https://github.com/<user>/MyContacts.git
cd MyContacts

### 2. Lancer le backend
cd backend
npm install
npm run dev


### 3. Lancer le frontend
cd mycontact-react
npm install
npm start

## Variables d’environnement
Backend (backend/.env)
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/<dbname>
PORT=3000
DB_NAME=backendDb
JWTSECRET=une_chaine_ultra_secrete
FRONTEND_ORIGIN=https://<ton-site>.netlify.app

Frontend (mycontact-react/.env)
REACT_APP_API_URL=https://mycontacts-backend-egxx.onrender.com

## Déploiement

Backend (API) : Render

Frontend (React) : Netlify

## Endpoints principaux
Auth

POST /api/auth/signup → Inscription

POST /api/auth/login → Connexion (retourne un JWT)

Contacts (protégés par JWT)

GET /api/contact → Liste des contacts

POST /api/contact → Créer un contact

GET /api/contact/:id → Obtenir un contact

PUT /api/contact/:id → Modifier un contact

DELETE /api/contact/:id → Supprimer un contact

## Header requis :

Authorization: Bearer <token>

## Fonctionnalités principales

Authentification avec JWT (signup/login).

Déconnexion simple (suppression du token).

Ajout de contacts (prénom, nom, numéro à 10 chiffres).

Liste des contacts affichée dans le frontend.

Protection des routes backend par middleware JWT.

## Démonstration

Page d’accueil : inscription et connexion.

Après connexion :

Ajout d’un contact.

Affichage de la liste des contacts.

## Licence

Projet académique – libre d’utilisation.
