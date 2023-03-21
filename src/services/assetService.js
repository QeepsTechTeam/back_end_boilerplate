const { HTTPError } = require('../error/httpError')
const mongoose = require('mongoose')


class AssetService {
    constructor(model){
        this.model = model
    }
    
    async getAssets(req) {

        // Return everything
        //const assets = await this.model.find().sort({createdAt: -1})
        //return assets;

        // Build Query 
        const queryObj = {... req.query}
        const excludedFields = ["page", "sort", "limit", "fields"];
        excludedFields.forEach((el) => delete queryObj[el]);

        //ADVANCE FILTERING QUERY
        let queryStr = JSON.stringify(queryobj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$$(match}`);

        // console.log(JSON.parse(queryStr));
        const query = NFT.find(JSON.parse(queryStr));
    }

    async getAsset ({ id }) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HTTPError('No such Asset', 404);
        }

        const asset = await this.model.findById(id)

        if (!asset) {
            throw new HTTPError('No such Asset', 404);
        }
        return asset;
    }


    async getAgencyAssets({ id }) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.log(('here'));
            throw new HTTPError('No such Asset', 404);
        } 
        const agencyAssets = await this.model.find({"agency_id": id})

        if (!agencyAssets) {
            throw new HTTPError('No such Asset', 404);
        }
        return agencyAssets;
    }

    async createAsset({ title, city, agency_id, provider_asset_id, reference }) {

        const oldAsset = await this.model.findOne({ title,  city,  agency_id });
        if (oldAsset) {
            throw new HTTPError('Asset Already Exist.', 409);
        }

        try {
            const asset = await this.model.create({ title, reference, provider_asset_id, city, agency_id })
            return asset;

        } catch (error){
            throw new HTTPError(`Asset creation failed: ${error.message}`, 500);
        }
    }

    async createAssets(list_assets) {
        try {
            const asset = await this.model.insertMany(list_assets)
            return asset;

        } catch (error){
            throw new HTTPError('Assets creation failed', 500);
        }
    }

    async deleteAsset({ id}) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HTTPError('No such Asset', 404);
        } 

        const asset = await this.model.findOneAndDelete({_id: id})

        if (!asset) {
            throw new HTTPError('No such Asset', 404);
        }

        return asset;
    }

    async updateAsset({req}) {

        const { title, reference, provider_external_id, city, agency_id } = req.body
        const asset = await this.model.findOneAndUpdate(
            { reference, agency_id }, 
            { ...req.body },
            { upsert: true, new: true }
        )

        if (!asset) {
            throw new HTTPError('No such Asset', 404);
        }

        return asset;
    }

}


module.exports = AssetService
