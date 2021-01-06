const express = require('express')
const router = express.Router()
const AdController = require('../controller/ad')

router.get('/get-ad',AdController.getAd)
router.post('/post-ad',AdController.createAd)
router.get('/ad-detail/:id',AdController.getAdDetail)

module.exports = router