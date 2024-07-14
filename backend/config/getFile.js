const datauriParser = require('datauri/parser')
const path = require('path')
const getFile = (file) => {
    const parser = new datauriParser()
    const extName = path.extname(file.originalname).toString()
    return parser.format(extName, file.buffer)
}

module.exports = getFile