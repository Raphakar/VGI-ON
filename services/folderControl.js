const fs = require('fs')

module.exports = {
    createIfNotExistsPhotoFolder: () => {
        const currentDate = new Date();
        let currentPath = `./photosUploaded/${currentDate.getFullYear()}`;
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        currentPath += `/${currentDate.getUTCMonth()}`;
        if (!fs.existsSync(currentPath)) {
            fs.mkdirSync(currentPath);
        }
        return currentPath+"/";
    },
    addFileToFolder: (fileName, file) => {
        let base64Image = file.split(';base64,').pop();
        fs.writeFile("teste2222.png", base64Image, { encoding: 'base64' }, function (err) {
            console.log('File created');
        });
    }
}
