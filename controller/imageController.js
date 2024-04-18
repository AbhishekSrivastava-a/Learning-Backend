const path = require('path');
const multer = require('multer');
const Image = require('../model/imageModel');
const User = require('../model/userModel');


const usersImage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: async function (req, file, cb) {
        try {
            const userId = req.query.id;
            const user = await User.findByPk(userId);
            if (!user) {
                cb(new Error("User not found."));
                return;
            }
            const userName = user.name;
            const fileExtension = path.extname(file.originalname);
            const newFilename = `${userId}-${userName}${fileExtension}`;
            cb(null, newFilename);
        } catch (error) {
            cb(new Error("Error fetching user."));
        }
    }
});


const upload = multer({
    storage: usersImage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .png, .jpg, .jpeg formats allowed!"));
        }
    }
}).single('image');

async function renderImageUploadPage(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', 'imageUpload.html'));
}

async function handleImageUpload(req, res) {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        } else if (err) {
            return res.status(500).send('Error uploading image.');
        }
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        try {
            const user = await User.findByPk(req.query.id);
            if (user) {
                const imageName = req.file.filename; 
                const imageType = req.file.mimetype.split('/')[1];
                const imagePath = req.file.path;
                const image = await Image.create({ imageName, imageType, imagePath });

                await user.update({ profileImage: imageName });
                return res.status(200).send('Image uploaded successfully.');
            } else {
                return res.status(404).send('User not found.');
            }
        } catch (error) {
            return res.status(500).send('Error inserting image into database.');
        }
    });
}

module.exports = {
    renderImageUploadPage,
    handleImageUpload
};