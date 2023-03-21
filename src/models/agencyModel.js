const mongoose = require('mongoose')

const agencySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    external_provider_id: {
        type: String,
        required: false
    },
    external_provider_source: {
        type: String, 
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Agency', agencySchema)

// Asset.find()
