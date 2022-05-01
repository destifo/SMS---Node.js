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

const studentSchema = mongoose.Schema({
    name: {
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
    gender: {
        type: String,
        enum: ['male', 'female'],
        lowercase: true,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    section: {
        type: mongoose.Schema.type.ObjectId,
        ref: 'Section'
    },
    markList: {
        type: [subjectSchema],
    }

});

const Student = mongoose.model('Student', studentSchema);

function validateStudent(student) {
    const schema = {
        name: Joi.string().required().min(5).max(255),
        phoneNumber: Joi.string().required().min(10),
        gender: Joi.string().valid('male', 'female'),
    };

    return Joi.validate(student, schema);
}

module.exports.Student = Student;
module.exports.validateStudent = validateStudent;