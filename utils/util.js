const crypto = require('crypto');

module.exports.response = (code, data) => {
    return {
        code,
        data
    }
}

module.exports.md5 = (str) => {
    const md5 = crypto.createHash("md5").update(str);
    return md5.digest('hex').toUpperCase()
}