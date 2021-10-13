const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController');
const adminController = require('../app/controllers/AdminController');


router.get('/logout', adminController.logout);
router.get('/register', adminController.register);
router.get('/login', adminController.login);
router.post('/login', adminController.log);
///////////////////////////////////////
router.get('/blog-single', siteController.blogSingle);
router.get('/reservation', siteController.reservation);
router.get('/blog', siteController.blog);
router.get('/menu', siteController.menu);
router.get('/', siteController.home);
module.exports = router;
