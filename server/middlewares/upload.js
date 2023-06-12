const multer = require("multer");
const path = require('path')
const {router} = require("express/lib/application");

const storage = multer.diskStorage({
    destination(req, file, done) {
        done(null, 'uploads/');
    },

    filename(req, file, done) {
        const ext = path.extname(file.originalname);//파일의 확장자를 제외한 이름
        const fileName = `${path.basename(
            file.originalname,
            ext
        )}_${Date.now()}${ext}`;//파일의 중복과 덮어쓰기를 방지하기 위해 시간을 붙인다.
        done(null, fileName);
    },
});
const limits = { files: 10 ,fileSize: 5 * 1024 * 1024 };//한번에 업로드 가능한 파일수와 파일 사이즈 제한

const multerConfig = {
    storage,
    limits,
};

const upload = multer(multerConfig);

router.post('/upload', upload.single('imgUpload'), (req, res) => {
    console.log(req.file);
    console.log(req.body.subject);
    res.send('upload!');
});
