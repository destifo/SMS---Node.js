const mongoose = require('mongoose');
const Joi = require('joi');


const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'Student',
        required: true,
    }
});

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    id: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'Teacher',
        required: true,
    }
});

const sectionSchema = mongoose.Schema({
    sectionName: {
        type: String,
        required: true,
        min: 2,
        unique: true,
    },
    students: {
        type: [ studentSchema ],
    },
    teachers: {
        type: [teacherSchema],
    },

});

const Section = mongoose.model('Section', sectionSchema);

function validateSection(section) {
    const schema = {
        sectionName: Joi.string().required().min(2),
        students: Joi.array().items(Joi.ObjectId()),
        teachers: Joi.array().items(Joi.ObjectId()),
    };

    return Joi.validate(section, schema);
}

module.exports.Section = Section;
module.exports.validateSection = validateSection;