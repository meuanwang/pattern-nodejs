const mongoose = require('mongoose');
const Schema = mongoose.Schema

// schemaType 
const type = {
  number_slot : { type: String, required: false , default : null , unique : true},
  car_size : { type: String, required: true },
  status: { type: String, enum: ['Active','IsActive'] , default: "Active"},
  nearbyEntry  : { type: Number, required: false , default : null }
}

const option = {
  timestamps: true
}

const SchemaData = new Schema(type,option)
const Model = mongoose.model('parkslots', SchemaData)

module.exports =  { Model , SchemaData }