const Asset = require('../models/assetModel')
const AssetService = require('../services/assetService')
const {withErrorHandler} = require('../error/httpError')

// Init the service object
const assetService = new AssetService(Asset)

// get all Assets
const getAssets = withErrorHandler(async (req, res) => {
    // If I want to getevery Asset with city = "Paris"
    /// const Assets = await Asset.find({city: "Paris"})

    // Return everything
    const assets = await assetService.getAssets()
    return assets;
})

// get a signle Asset
const getAsset = withErrorHandler(async (req, res) => {
    const { id } = req.params
    const asset = await assetService.getAsset({ id })
    return asset;

})

// get assets for a specific agency
const getAgencyAssets = withErrorHandler(async (req, res) => {
    const { id } = req.params
    const assets = await assetService.getAgencyAssets({ id })
    return assets;
})

// create a new Asset 
const createAsset = withErrorHandler(async (req, res) => {
    // get the data
    const { title, reference, provider_external_id, city, agency_id } = req.body

    // call the service
    const asset = await assetService.createAsset({ title, reference, provider_external_id, city, agency_id })
    return asset;
})

// create a new Assets 
const createAssets = withErrorHandler(async (req, res) => {
    // get the data
    const list_assets = req.body

    // call the service
    const asset = await assetService.createAssets(list_assets)
    return asset;
})

// delete a Asset 
const deleteAsset = withErrorHandler(async (req, res) => {
    const { id } = req.params

    // call the service
    const asset = await assetService.deleteAsset({ id })
    return asset;

})


// update a Asset
const updateAsset = withErrorHandler(async (req, res) => {
    // call the service
    const asset = await assetService.updateAsset({ req })
    return asset;
})


module.exports = {
    createAsset,
    createAssets,
    getAssets,
    getAsset,
    getAgencyAssets,
    deleteAsset,
    updateAsset
}
