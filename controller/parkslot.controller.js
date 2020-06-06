const model = require('../models/setting.parkslot.model').Model

function generateNumberSlot(car_size){
    if(car_size == "small"){
        return "S"+(""+Math.random()).substring(2,7)
    }
    if(car_size == "medium"){
        return "M"+(""+Math.random()).substring(2,7)
    }
    if(car_size == "large"){
        return "L"+(""+Math.random()).substring(2,7)
    }
}

class ParkSlot {
    constructor(props) {}

    async findAll() {
        return await model.find({})
            .then(data => data === null ? [] : data)
            .catch(err => err)

    }

    async create(request,response) {
        let body = request.body
        let number_slot = generateNumberSlot(request.body.car_size)
        Object.assign(body,{number_slot:number_slot})
        const datas = new model(request.body);
        console.log(datas)
        try{
            await datas.save();
            response.status(201).send({datas})
        }catch(e){
            response.status(400).send(e)
        }
    }

    async getParklotStatus(request) {
        let slot = request.params.number_slot
        return await model.find({number_slot:slot})
            .then(data => data === null ? [] : data)
            .catch(err => err)

    }

}

module.exports = new ParkSlot;
