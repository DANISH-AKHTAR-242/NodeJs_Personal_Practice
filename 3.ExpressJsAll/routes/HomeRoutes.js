const express = require('express');
const { homePageResponse } = require('../controllers/HomeController');

const router = express.Router();

router.get('/', homePageResponse);
router.get('/home', homePageResponse);

router.get("/about", (req, res) => {
  res.send("this is about page");
});

module.exports = router;