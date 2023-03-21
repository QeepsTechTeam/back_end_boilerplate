const express = require('express')
const agencyController = require('../controllers/agencyController')

const router = express.Router()

// GET all agencys
router.get('/', agencyController.getAgencies)

// GET a single agency
router.get('/:id', agencyController.getAgency)

// POST a new agency
router.post('/', agencyController.createAgency)

// DELETE a agency
router.delete('/:id', agencyController.deleteAgency)

// UPDATE a agency
router.patch('/:id', agencyController.updateAgency)

module.exports = router
