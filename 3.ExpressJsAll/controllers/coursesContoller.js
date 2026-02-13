const { courses } = require("../models/db");

function coursesResponse (req, res) {
    res.send("this is courses page");
}

function createCourse (req, res) {
    // const course = req.body;
    // res.send(`you are creating course with name ${course.name}`);
    const body = req.body;
    courses.push(body);
    res.json(courses);
}

function getallCourses (req, res) {
    const data = courses;
    // res.send("you are looking for all courses");
    res.json(data);
}

function getCourseById (req, res) {
    const id = req.params.id;
    res.send(`you are looking for course with id ${id}`);
}

module.exports = {
    coursesResponse,
    createCourse,
    getallCourses,
    getCourseById
}