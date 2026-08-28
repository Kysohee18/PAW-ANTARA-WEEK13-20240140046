const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chat.controller');
const { requireLogin } = require('../middleware/auth.middleware');

router.post('/', requireLogin, chat);

module.exports = router;
