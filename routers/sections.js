
const Express = require('express');
const router = Express.Router();
const { Section, validateSection } = require('../models/Section');
const { Student } = require('../models/Student');
// const { Teacher } = require('../models/Teacher');


router.get('/', async (req, res) => {
    const sections = await Section.find();
    if (!sections)
        return res.status(404).send("No sections found.");
    res.send(sections);
});

router.get('/:id', async (req, res) => {
    const section = await Section.findById(req.params.id);
    if (!section)
        return res.status(404).send("Section with the given not found.");
    res.send(section);
});

router.post('/', async (req, res) => {
    const { error } = validateSection(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const section = new Section({
        sectionName: req.body.sectionName,
        students: [],
        teachers: []
    });

    for (let studentid of req.body.students){
        const student = Student.findById(studentid);
        if (!student)
            return res.status(400).send('Student with the given id not found');

        const secStudent = {
            name: student.name,
            id: student._id,
        }
        section.students.push(secStudent);
    }

    // for (let teacherid of req.body.teachers){
    //     const teacher = await Teacher.findById(teacherid);
    //     if (!teacher)
    //         return res.status(400).send('Teacher with the given id not found');

    //     const secTeacher = {
    //         name: teacher.name,
    //         id: teacher._id,
    //     }
    //     section.teacher.push(secTeacher);
    // }

    await section.save();

    res.send(section);
});

router.put('/:id', async (req, res) => {
    const { error } = validateSection(req.body);
    if ( error )
        return res.status(400).send(error.details[0].message);

    const section = await Section.findById(req.params.id);
    if (!section)
        return res.status(404).send("Section with given id not found.");

    section.set({
        sectionName: req.body.sectionName,
        students: [],
        teachers: [],
    });

    for (let studentid of req.body.students){
        const student = Student.findById(studentid);
        if (!student)
            return res.status(400).send('Student with the given id not found');

        const secStudent = {
            name: student.name,
            id: student._id,
        }
        section.students.push(secStudent);
    }

    await section.save();

    res.send(section);

});

router('/:id', async (req, res) => {
    const section = await Section.findByIdAndRemove(req.params.id);
    if (!section)
        return res.status(400).send('Section with given id not found');
    
    res.send(section);
})