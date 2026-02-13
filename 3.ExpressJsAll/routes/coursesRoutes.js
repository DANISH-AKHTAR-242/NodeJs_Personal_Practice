const express = require('express');
const { coursesResponse, createCourse, getCourseById, getallCourses } = require('../controllers/coursesContoller');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// router.get('/courses', coursesResponse);
router.post('/', authMiddleware, createCourse);
router.get('/', authMiddleware, getallCourses);
//url params
router.get('/:id', authMiddleware, getCourseById);

module.exports = router;