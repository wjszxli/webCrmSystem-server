const formidable = require('koa-formidable'); // 图片处理
const path = require('path')
const mysql = require('../utils/mysql')

const fs = require('fs'); // 图片路径

const mkdirs = (dirname, callback) => {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
};

module.exports.uploadImage = async (ctx, next) => {
    try {
        const {
            id
        } = ctx.request.query
        let form = formidable.parse(ctx.request);

        function formImage() {
            return new Promise((resolve, reject) => {
                form((opt, {
                    fields,
                    files
                }) => {
                    let filename = files.file.name;
                    let uploadDir = 'public/upload/';
                    let avatarName = Date.now() + '_' + filename;
                    mkdirs('public/upload', function () {
                        fs.renameSync(files.file.path, uploadDir + avatarName); //重命名
                        resolve('/' + uploadDir + avatarName)
                    })
                })
            })
        }
        let url = await formImage()

        const res = await mysql('cPublicNumber')
            .where({
                id
            })
        if (res.length) {
            if (res[0].starImage) {
                url = `${res[0].starImage},${url}`
            }
        }
        await mysql('cPublicNumber')
            .update({
                starimage: url
            })
            .where({
                id
            })
        ctx.state.data = {
            url
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getImage = async (ctx, next) => {
    try {
        const url = ctx.request.path.replace('/api','')
        const staticPath = '../' + url
        const data = fs.readFileSync(path.join(__dirname, staticPath))
        ctx.set('Content-Type', 'image/png')
        ctx.body = data
    } catch (error) {
        throw error
    }

}