const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true, unique: true },
    role: { type: String, require: true, default:'user'}
},{
    timestamps: true,
});

//Add plugin

module.exports = mongoose.model('User', User);
