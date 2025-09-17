const express = require('express');
const router = express.Router();

const auth = require("../middleware/auth");
const contactCtrl = require('../controllers/contact.controller');

router.get('/', auth, contactCtrl.getAllContacts);
router.post('/', auth, contactCtrl.createContact);
router.get('/:id', auth, contactCtrl.getOneContact);
router.put('/:id', auth, contactCtrl.modifyContact);
router.delete('/:id', auth, contactCtrl.deleteContact);

module.exports = router;