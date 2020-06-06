const model = require('../models/setting.registration.model').Model
const parkSlotModel = require('../models/setting.parkslot.model').Model

async function genData(body){
    if(body.car_size == "small"){
        let parkslot = await parkSlotModel.find({car_size: body.car_size,status:"Active"}).sort([['nearbyEntry', 'asc']])
        return parkslot[0]
    }
    if(body.car_size == "medium"){
        let parkslot = await parkSlotModel.find({car_size: body.car_size,status:"Active"}).sort([['nearbyEntry', 'asc']])
        return parkslot[0]
    }
}

class Registration {
    constructor(props) {}

    async findAll() {
        return await model.find({})
            .then(data => data === null ? [] : data)
            .catch(err => err)
    }

    async create(request,response) {
        let body = request.body
        let parkslot = await genData(body).then(data=>data)
        if(parkslot == undefined){
            response.status(400).json({'error_message' : 'slot เต็ม'})
        }else{
            Object.assign(body,{number_slot: parkslot.number_slot})
            const datas = new model(body);
            try{
                let result = await datas.save().then(data=>data);
                await parkSlotModel.findOneAndUpdate(
                    { number_slot: result.number_slot },
                    { status : "IsActive" }
                )
                response.status(201).send({datas})
            }catch(e){
                response.status(400).send(e)
            }
        }
    }

    async unRegistration(request,response) {
        let body = request.body
        let number_slot = request.params.number_slot
        await model.findOneAndUpdate({number_slot:number_slot,plate_number:body.plate_number},{status:"IsActive"})
                    .then(async res=>{
                        await parkSlotModel.findOneAndUpdate(
                            { number_slot: res.number_slot },
                            { status : "IsActive" }
                        )
                        await response.status(201).send(null)
                    }).catch(err=>{
                        console.log(err)
                    })
    }

    async carPark() {
        return await model.find({status:"Active"})
            .then(data => data === null ? [] : data)
            .catch(err => err)
    }

    async carParkByCarSize() {
        let object = {}
        let small = []
        let medium = []
        let large = []
        return await model.find({status:"Active"})
            .then(data => {
                data.map(info=>{
                    info.car_size == "small" ? small.push(info.plate_number) : null
                    info.car_size == "medium" ? medium.push(info.plate_number) : null
                    info.car_size == "large" ? large.push(info.plate_number) : null
                })
                Object.assign(object,{
                    small:small,
                    medium:medium,
                    large:large
                })
                return object
            })
            .catch(err => err)
    }

    async numberSlotByCarSize() {
        let object = {}
        let small = []
        let medium = []
        let large = []
        return await model.find({status:"Active"})
            .then(data => {
                data.map(info=>{
                    info.car_size == "small" ? small.push(info.number_slot) : null
                    info.car_size == "medium" ? medium.push(info.number_slot) : null
                    info.car_size == "large" ? large.push(info.number_slot) : null
                })
                Object.assign(object,{
                    small:small,
                    medium:medium,
                    large:large
                })
                return object
            })
            .catch(err => err)
    }
}

module.exports = new Registration;
