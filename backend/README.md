# MyContacts - Backend

API REST sécurisée pour gérer un carnet de contacts.  
Développée avec **Node.js**, **Express**, **MongoDB (Mongoose)** et **JWT** pour l’authentification.

---

## Fonctionnalités
- Inscription (signup) avec mot de passe hashé (bcrypt).
- Connexion (login) avec génération de token JWT.
- Middleware d’authentification (JWT).
- CRUD complet sur les contacts :
  - Créer un contact.
  - Lire un contact.
  - Modifier un contact.
  - Supprimer un contact.
  - Lister tous les contacts (protégé).
- Validation basique des champs (ex: numéro de téléphone = 10 chiffres).

---

## Installation

Cloner le repo et installer les dépendances :

```bash
cd backend
npm install
