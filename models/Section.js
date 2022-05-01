const mongoose = require('mongoose');
const Joi = require('joi');

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        min: 2,
        unique: true,
    },
    students: {
        type: [ mongoose.Schema.type.ObjectId ],
        ref: 'Student',
    },
    teachers: {
        type: [mongoose.Schema.type.ObjectId], 
        ref: 'Teacher'
    },

});

const Section = mongoose.model('Section', sectionSchema);

function validateSection(section) {
    const schema = {
        sectionName: Joi.string().required().min(2),
    };

    return Joi.validate(section, schema);
}

module.exports.Section = Section;
module.exports.validateSection = validateSection;