const Contact = require('../models/contact.model');

exports.createContact = (req, res, next) => {
  // vérif simple: champs requis + 10 chiffres
  if (!req.body.first_name || !req.body.last_name || !req.body.phone_number) {
    return res.status(400).json({ error: "Champs requis: first_name, last_name, phone_number" });
  }
  if (!/^\d{10}$/.test(String(req.body.phone_number))) {
    return res.status(400).json({ error: "Le numéro doit contenir exactement 10 chiffres" });
  }

  const contact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: String(req.body.phone_number)
  });
  contact.save().then(
    () => {
      return res.status(201).json({
        message: 'Nouveau Contact enregistré !'
      });
    }
  ).catch(
    (error) => {
      return res.status(400).json({
        error: error 
      });
    }
  );
};

exports.modifyContact = (req, res, next) => {
  // mêmes vérifs qu’en création
  if (!req.body.first_name || !req.body.last_name || !req.body.phone_number) {
    return res.status(400).json({ error: "Champs requis: first_name, last_name, phone_number" });
  }
  if (!/^\d{10}$/.test(String(req.body.phone_number))) {
    return res.status(400).json({ error: "Le numéro doit contenir exactement 10 chiffres" });
  }

  const contact = new Contact({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: String(req.body.phone_number)
  });
  Contact.updateOne({_id: req.params.id}, contact).then(
    (result) => {
      // si aucun doc trouvé
      if ((result && result.matchedCount === 0) || (result && result.n === 0)) {
        return res.status(404).json({ error: 'Contact introuvable' });
      }
      // 200 pour une modification (pas 201)
      return res.status(200).json({
        message: 'Contact modifié avec succès!'
      });
    }
  ).catch(
    (error) => {
      return res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneContact = (req, res, next) => {
  Contact.findOne({
    _id: req.params.id
  }).then(
    (contact) => {
      if (!contact) {
        return res.status(404).json({ error: 'Contact introuvable' });
      }
      return res.status(200).json(contact);
    }
  ).catch(
    (error) => {
      return res.status(404).json({
        error: error
      });
    }
  );
};

exports.deleteContact = (req, res, next) => {
  Contact.deleteOne({_id: req.params.id}).then(
    (result) => {
      if (result && result.deletedCount === 0) {
        return res.status(404).json({ error: 'Contact introuvable' });
      }
      return res.status(200).json({
        message: 'Contact supprimé !'
      });
    }
  ).catch(
    (error) => {
      return res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllContacts = (req, res, next) => {
  Contact.find().then(
    (contacts) => {
      return res.status(200).json(contacts);
    }
  ).catch(
    (error) => {
      return res.status(400).json({
        error: error
      });
    }
  );
};
