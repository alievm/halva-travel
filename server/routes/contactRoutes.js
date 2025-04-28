const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.post('/', contactController.createContactRequest);
router.get('/', contactController.getAllContactRequests); // можно ограничить авторизацией

module.exports = router;
