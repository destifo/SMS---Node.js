const mongoose = require('mongoose');
const Joi = require('joi');

const subjectSchema = mongoose.Schema({
    subjectName: {
        type: String,
        enum: ['mathemaics', 'chemistry', 'biology', 'history', 'physics'],
        required: true,
    },
    student: {
        type: mongoose.Schema.type.ObjectId, 
        ref: 'Student',
    },
    test2: {
        type: Number,
        min: 0,
        max: 10
    },
    mid: {
        type: Number,
        min: 0,
        max: 20
    },
    final: {
        type: Number,
        min: 0,
        max: 45
    },
    test1: {
        type: Number,
        min: 0,
        max: 10
    },
    assesment: {
        type: Number,
        min: 0,
        max: 15
    },

});

const Subject = mongoose.model('Subject', subjectSchema);

function validateSubject(subject) {
    const schema = {
        subjectName: Joi.string().required().valid('mathemaics', 'chemistry', 'biology', 'history', 'physics'),
    };

    return Joi.validate(section, schema);
}

module.exports.Section = Section;
module.exports.validateSection = validateSection;