const express = require('express')
const router = express()
const userController = require('../controller/userController');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/api/user',upload.single('resume'),userController.createForm)
router.get('/api/countries',userController.fetchCountry)
router.get('/api/suggestions',userController.autoSuggestions);
router.get('/api/userlist',userController.userList)
router.get('/api/fillter',userController.searchUser)
router.delete('/api/user-remove/:id',userController.userDelete)
router.get('/api/user-details/:id',userController.userDetails)
router.get('/api/user-pdf/:id',userController.openPdf)

module.exports = router;