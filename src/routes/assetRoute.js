const express = require('express')
const assetController = require('../controllers/assetController')

const router = express.Router()

// GET all assets
router.get('/', assetController.getAssets)

// GET a single asset
router.get('/:id', assetController.getAsset)

// GET agency assets
router.get('/agency/:id', assetController.getAgencyAssets)

// POST a new asset
router.post('/', assetController.createAsset)

// POST new assets
router.post('/multiple_assets', assetController.createAssets)

// DELETE a asset
router.delete('/:id', assetController.deleteAsset)

// UPDATE a asset
router.patch('/', assetController.updateAsset)

module.exports = router
