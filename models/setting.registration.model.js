const mongoose = require('mongoose');
const Schema = mongoose.Schema

// schemaType 
const type = {
  plate_number : { type: String, required: true , default : null },
  car_size : { type: String, required: true },
  number_slot: { type: String, required: true  },
  status: { type: String, enum: ['Active','IsActive'] , default: "Active"},
}

const option = {
  timestamps: true
}

const SchemaData = new Schema(type,option)
const Model = mongoose.model('registrations', SchemaData)

module.exports =  { Model , SchemaData }