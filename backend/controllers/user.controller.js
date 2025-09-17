const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const JWT_SECRET = process.env.JWTSECRET;

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      return user.save();
    })
    .then(savedUser => {
      return res.status(201).json({
        message: "Utilisateur créé !",
        id: savedUser._id,
        email: savedUser.email
      });
    })
    .catch(error => {
      if (error.code === 11000) {
        return res.status(409).json({ error: "Email déjà utilisé" });
      }
      return res.status(400).json({ error });
    });
};

exports.login = (req, res, next) => {
  const email = (req.body.email || '').trim().toLowerCase();
  const password = req.body.password || '';
  if (!email || !password) {
    return res.status(400).json({ message: 'Email et mot de passe requis' });
  }

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }
      return bcrypt.compare(password, user.password).then(valid => ({ user, valid }));
    })
    .then(result => {
      if (!result) return; // on a déjà répondu
      const { user, valid } = result;
      if (!valid) {
        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });
      return res.status(200).json({ userId: user._id, token });
    })
    .catch(err => {
      console.error("Login error:", err);
      return res.status(500).json({ message: 'Erreur serveur' });
    });
};
