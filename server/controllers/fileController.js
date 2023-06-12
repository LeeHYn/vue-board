const db = require("../models");
const File = db.files
async function uploadFile(req, res) {
    try {
        const { originalname, mimetype, size, path } = req.file;
        const { userId } = req.body;

        // Create a new file record in the database
        const file = await File.create({
            fileName: originalname,
            fileType: mimetype,
            fileSize: size,
            filePath: path,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: userId
        });

        res.status(201).json({ success: true, file });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to upload file' });
    }
}

module.exports = {
    uploadFile
};
