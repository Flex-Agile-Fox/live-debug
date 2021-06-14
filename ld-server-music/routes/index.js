const express = require('express')
const router = express.Router()

const userRoutes = require('./user')
const songRoutes = require('./song')

router.use('/', userRoutes)
router.use('/songs', songRoutes)

module.exports = router
