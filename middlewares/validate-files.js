const { request, response } = require("express");

const validateFiles = (req = request, res = response, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        res.status(400).json({msg: "No files to upload/update"});
        return;
    }

    next();
}

module.exports = {
    validateFiles
}