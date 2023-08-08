const fs = require('fs')

export const renamefile = () => {
    // renaming file before sending to DB
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
}
// module.exports = renamefile