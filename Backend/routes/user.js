// server/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();
const cors = require('cors');


const app = express();
app.use(cors());

router.post('/login', userController.loginUser);

module.exports = router;
