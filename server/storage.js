const multer = require('multer');

// dev: wiki/entries
// docker: /wiki/entries
const storagePath = process.env.STORAGE_PATH;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        const currentTime = Date.now();
        cb(null, `${file.originalname}-${currentTime}` + '.md');
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
};
