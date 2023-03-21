const mongoose = require('mongoose')
const { HTTPError } = require('../error/httpError')


class AgencyService {
    constructor(model){
        this.model = model
    }

    // get all Agencies
    async getAgencies(req, res){
        // If I want to getevery Agency with city = "Paris"
        /// const Agencies = await Agency.find({city: "Paris"})
        // Return everything
        const agencies = await this.model.find().sort({createdAt: -1})
        return agencies;
    }

    // get a signle Agency
    async getAgency({id}) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HTTPError('No such Asset', 404);
        }

        const agency = await this.model.findById(id)

        if (!agency) {
            throw new HTTPError('No such Asset', 404);
        }
        return agency;
    }

    // create a new Agency 
    async createAgency({ name, city, external_provider_id, external_provider_source }) {
        const oldAgency = await this.model.findOne({ name,  city });
        
        if (oldAgency) {
            throw new HTTPError("Agency Already Exist.", 409);
        }
        // add doc to db
        try {
            const agency = await this.model.create({ name, city, external_provider_id, external_provider_source })
            return agency;
            
        } catch (error){
            throw new HTTPError(`Agency creation failed: ${error.message}`, 500);
        }
    }

    // delete a Agency 
    async deleteAgency ({ id }) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: 'No such Agency'})
        } 

        const agency = await this.model.findOneAndDelete({_id: id})

        if (!agency) {
            throw new HTTPError('No such Agency.', 404);
        }

        return agency;
    }

    // update a Agency
     async updateAgency({ id, req}) {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new HTTPError('No such Asset', 404);
        } 

        const agency = await this.model.findOneAndUpdate({_id: id}, {
        ...req.body
        })

        if (!agency) {
            throw new HTTPError('No such Asset', 404);
        }

        return agency;
    }

}


module.exports = AgencyService