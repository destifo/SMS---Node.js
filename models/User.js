const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 5,
        max: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    role: {
        type: String,
        enum: ['parent', 'admin', 'teacher'],
        lowercase: true,
    },
    fullname: {
        type: String,
        required: true,
        min: 5,
        max: 255,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 10,
    },
    parentChild: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    section: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'Section'
    },

});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        username: Joi.string().required().min(5).max(255),
        password: Joi.string().required().min(8).max(255),
        fullname: Joi.string().required().min(5).max(255),
        phoneNumber: Joi.string().required().min(10),
        role: Joi.string().valid('parent', 'admin', 'teacher'),

    };

    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;