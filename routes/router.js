const express = require('express');
const router = express.Router();
const multer = require('multer');
const createNewUser = require('../controller/createNewUser');
const loginController = require('../controller/userLoginController');
const ImageController = require('../controller/imageController');
const getUsersDetailsById = require('../controller/getUserDetailById');
const getAllUsersDetails = require('../controller/getAllUsersDetails');
const updateUsersDetails = require('../controller/updateUserDetail');
const updateUsersPassword = require('../controller/updateUserPassword');
const deleteUsersDetails = require('../controller/deleteUserDetail');
const upload = multer({ dest: 'uploads/' });

router.get('/', (req, res) => res.sendFile('register.html', { root: './public' }));
router.post('/register', createNewUser.registerUser);

router.get('/login', (req, res) => res.sendFile('login.html', { root: './public' }));
router.post('/login', loginController.loginUser, )

router.get('/upload', ImageController.renderImageUploadPage); 
router.post('/upload', upload.single('image'), ImageController.handleImageUpload); 

router.get('/homepage', (req, res) => res.sendFile('homepage.html', { root: './public' }));

router.get('/getUserById', getUsersDetailsById.getUserById);
router.get('/getAllUsers', getAllUsersDetails.getAllUsers);
router.put('/updateUserName', updateUsersDetails.updateUserName);
router.put('/updateUserPassword', updateUsersPassword.updateUserPassword);
router.delete('/deleteUserDetails', deleteUsersDetails.deleteUserDetails);

module.exports = router;