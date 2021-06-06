const fs = require('fs')

module.exports = {
    createIfNotExistsPhotoFolder: () => {
        const currentDate = new Date();
        let currentPath = `./photosUploaded/${currentDate.getFullYear()}`;
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        currentPath += `/${currentDate.getUTCMonth() + 1}`;
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        return currentPath + "/";
    },
    addFileToFolder: async (fileName, fileBase64) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileName, fileBase64, { encoding: 'base64' }, function (err) {
                if (err)
                    reject("Error: " + err.message);
                resolve('File created');
            });

        })
    }
}
