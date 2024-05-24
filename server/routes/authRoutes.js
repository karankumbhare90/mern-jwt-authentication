const express = require('express');
const router = express.Router() ;
const cors = require('cors');
const { test, registerUser, userLogin, getProfile } = require('../controllers/authControllers');

// MiddleWare
router.use(
    cors({
        credentials : true,
        origin : 'http://localhost:5173',
        optionSuccessStatus:200
    })
)

router.get('/', test);
router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/dashboard', getProfile);

module.exports = router;