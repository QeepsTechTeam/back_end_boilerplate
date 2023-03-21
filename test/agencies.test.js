const mongoose = require('mongoose')
const assert = require('assert');
const Agency = require('../src/models/agencyModel')
const AgencyService = require('../src/services/agencyService')
const { describe } = require('node:test');


// créer une base mongo avec docker
// connection de test à la base 
// lancer mon service avec le model injecté

describe('Check Agency Service', () => {
    it('Check Creation of agency', async() => {
        // code for testing the api    
        // connect to db 
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT")
        .then(() => {
            console.log(("Connected"));
        })
        .catch((error) => {
            console.log(error);
        })
        const agencyService = new AgencyService(Agency)
        const agency = await agencyService.createAgency({
            "name": "Qeeps",
            "city": "Paris",
        })
        // console.log(agency);
        assert(agency)

        mongoose.connection.close();
    }).timeout(5000);

    it('Check existing of agency', async() => {
        // code for testing the api    
        // connect to db 
        await mongoose.connect("mongodb://root:root@localhost:27017/?authMechanism=DEFAULT")
        .then(() => {
            console.log(("Connected"));
        })
        .catch((error) => {
            console.log(error);
        })

        const agencyService = new AgencyService(Agency)
        // Get the mo
        const agencies = await agencyService.getAgencies()
        
        const agency = await agencyService.getAgency({"id":agencies[0]['id']})
        // console.log(agency);
        assert(agency)

        mongoose.connection.close();
    }).timeout(5000);
    
});
