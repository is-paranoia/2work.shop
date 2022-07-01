const {Schema, model, types} = require('pg')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: types.TypeId, ref: 'Link'}]
})

module.exports = model("User", schema) 