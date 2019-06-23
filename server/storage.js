const multer = require('multer');

// const storagePath = '/wiki/files';
const storagePath = 'wiki/files';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storagePath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '.md');
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
};
