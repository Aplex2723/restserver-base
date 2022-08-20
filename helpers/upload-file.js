const path = require('path')
const { v4: uuidv4 } = require('uuid');

const uploadFileHelper = (files, validExtensions = ['png', 'jpg', 'gif', 'jpeg'], folderName = '') => {

    
    return new Promise((resolve, reject) => {

        const { file } = files;

        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1]
    
        //  Validate extension
        if(!validExtensions.includes(extension)){
            return reject(`The extension ${extension} is not allowed, ${validExtensions}`);
        }
    
        // Custom unique file name
        const tempName = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folderName, tempName);
    
        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
    
            resolve(tempName)
        });
    })

}

module.exports = {
    uploadFileHelper
}