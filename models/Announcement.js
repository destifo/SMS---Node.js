const mongoose = require('mongoose');
const Joi = require('joi');
const { required } = require('joi/lib/types/lazy');

const annoucnementSchema = mongoose.Schema({
    createDate: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true,
        min: 5,
        max: 50
    },
    content: {
        type: String,
        required: true,
        max: 300,
        min: 10,
    }
});

const Announcement = mongoose.model('Announcement', annoucnementSchema);

function validateAnnoucement(announcement) {
    const schema = {
        createDate: Joi.Date(),
        title: Joi.string().required().min(5).max(),
        content: Joi.string().required().min(10).max(300),
    };

    return Joi.validate(announcement, schema);
}

module.exports.Announcement = Announcement;
module.exports.validateAnnoucement = validateAnnoucement;