const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    provider_asset_id: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: true
    },
    agency_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Asset', assetSchema)

// Asset.find()
