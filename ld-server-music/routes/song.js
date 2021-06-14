const express = require('express')
const router = express.Router()
const SongController = require('../controllers/songController')
const Auth = require('../middlewares/auth')

router.use(Auth.authentication)
router.post('/songs', SongController.create)
router.use(Auth.authorization)
router.delete('/songs/:id', SongController.delete)

module.exports = router;
