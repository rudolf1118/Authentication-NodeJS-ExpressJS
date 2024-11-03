const {Schema, model} = require('mongoose');

const Role = new Schema({
    value:{type:String,unique:false,default:"USER"},
})

module.exports = model('Role', Role);