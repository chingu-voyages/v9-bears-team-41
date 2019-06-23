const multer = require('multer');

// dev: wiki/entries
// docker: /wiki/entries
const storagePath = process.env.STORAGE_PATH;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        // TODO: save current time to meta file
        // const currentTime = Date.now();
        const fileNameWithoutExtension = file.originalname.split('.')[0];
        cb(null, `${fileNameWithoutExtension}` + '.md');
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
};
