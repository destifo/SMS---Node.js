
const Express = require('express');
const router = Express.Router();
const mongoose = require('mongoose');
const { Student, validateStudent } = require('../models/Student');
const { Section, validateSection } = require('../models/Section');


async function registerStudent(student){
    const { error } = validateStudent(student);
    if (error)
        throw new Error(error);

    const assignedSection = await Section.findById(student.section);
    if (!assignedSection)
        throw Error('provided section does not exist');


    const newStudent = new Student({
        name: student.name,
        phoneNumber: student.phoneNumber,
        gender: student.gender,
        parent: student.parent,
        section: student.section,
    });

    const result = await newStudent.save();
    const studentid = result.id;

    assignedSection.students.push(studentid);

    return result;
}

async function getStudents() {
    const students = await Student.find();
    
    return students;
}

async function getStudent(id){
    const student = await Student.findById(id);

    return student;
}

async function updateStudent(id, info){
    const { error } = validateStudent(info);
    if (error)
        throw new Error(error);

    const student = await Student.findById(id);
    if (!student)
        return;

    student.set({
        name: info.name,
        phoneNumber: info.phoneNumber,
        gender: info.gender,
        parent: info.parent,
        section: info.section,
    });

    const result = await student.save();
    return result;
}

async function removeStudent(id) {
    const removedStudent = await Student.findByIdAndRemove(id);

    return removedStudent;
}

router.post('/', async (req, res) => {
    try{
        const result = await registerStudent(req.body);
        res.status(201).send(result);
    }catch(ex){
        res.status(400).send(ex.message);
    }
});

router.get('/', async (req, res) => {
    const students = await getStudents();

    if (!students)
        res.status(404).send('NO student found system');

    res.status(200).send(students);
});

router.get('/:id', async (req, res) => {
    const student = getStudent(req.params.id);

    if (!student)
        res.status(404).send(student);
    res.status(200).send(student);
});

router.put('/:id', async (req, res) => {
    const updatedStudent = await updateStudent(req.params.id, req.body);
    if (!updatedStudent)
        res.send();

    res.send(updatedStudent);
});

router.delete('/:id', async (req, res) => {
    const deletedStudent = await removeStudent(req.params.id);
    if (!deletedStudent)
        res.status(404).send('Student was not found');

    res.send(deletedStudent);
})