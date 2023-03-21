const Agency = require('../models/agencyModel')
const AgencyService = require('../services/agencyService')
const {withErrorHandler} = require('../error/httpError')

const agencyService = new AgencyService(Agency)

// get all Agencies
const getAgencies = withErrorHandler(async (req, res) => {
    const agencies = await agencyService.getAgencies()
    return agencies;
});

// get a signle Agency
const getAgency = withErrorHandler(async (req, res) => {
    console.log(req.params);
    const { id } = req.params

    const agency = await agencyService.getAgency({ id })
    return agency;
});

// create a new Agency 
const createAgency = withErrorHandler(async (req, res) => {
    const { name, city, external_provider_id, external_provider_source } = req.body

    const agency = await agencyService.createAgency({ name, city, external_provider_id, external_provider_source })
    return agency;
});


// delete a Agency 
const deleteAgency = withErrorHandler(async (req, res) => {
    const { id } = req.params
    // call the service
    const agency = await agencyService.deleteAgency({ id })
    return agency;
});


// update a Agency
// delete a Agency 
const updateAgency = withErrorHandler(async (req, res) => {
    const { id } = req.params

    // call the service
    const agency = await agencyService.updateAgency({ id, req })
    return agency;
});


module.exports = {
    createAgency,
    getAgencies,
    getAgency,
    deleteAgency,
    updateAgency
}