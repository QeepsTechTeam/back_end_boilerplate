const mongoose = require('mongoose')
const assert = require('assert');
const Asset = require('../src/models/assetModel')
const AssetService = require('../src/services/assetService')
const { describe } = require('node:test');
const { mockRequest, mockResponse } = require('mock-req-res')



// créer une base mongo avec docker
// connection de test à la base 
// lancer mon service avec le model injecté

describe('Check Asset Service', () => {
    it('Check Creation of asset', async() => {
        // code for testing the api    
        // connect to db 
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT")
        .then(() => {
            console.log(("Connected"));
        })
        .catch((error) => {
            console.log(error);
        })
        const assetService = new AssetService(Asset)
        const asset = await assetService.createAsset({
            "title": "test",
            "city": "test",
            "reference": "test",
            "agency_id": "test_agency_id"
        })
        // console.log(agency);
        assert(asset)

        mongoose.connection.close();
    }).timeout(5000);

    it('Check existing of asset', async() => {
        // code for testing the api    
        // connect to db 
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT")
        .then(() => {
            console.log(("Connected"));
        })
        .catch((error) => {
            console.log(error);
        })

        const assetService = new AssetService(Asset)
        // Get the mo
        const assets = await assetService.getAssets()
        
        const asset = await assetService.getAsset({"id":assets[0]['id']})
        // console.log(agency);
        assert(asset)

        mongoose.connection.close();
    }).timeout(5000);

    it('Check update or create', async() => {
        // code for testing the api    
        // connect to db 
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT")
        .then(() => {
            console.log(("Connected"));
        })
        .catch((error) => {
            console.log(error);
        })

        const assetService = new AssetService(Asset)
        // Update asset 
        const req = mockRequest({body: 
            {
                "title": "test",
                "city": "test",
                "reference": "test",
                "agency_id": "test_agency_id"
            }
        })
        const asset = await assetService.updateAsset({ req })

        // console.log(agency);
        assert(asset)

        mongoose.connection.close();
    }).timeout(5000);
    
});
