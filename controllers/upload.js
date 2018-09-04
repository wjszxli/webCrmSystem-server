const formidable = require('koa-formidable'); // 图片处理
const mysql = require('../utils/mysql')

const fs = require('fs'); // 图片路径
const path = require('path'); // 图片路径

const mkdirs = (dirname, callback)=> {
    fs.exists(dirname, function(exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), function() {
                fs.mkdir(dirname, callback);
            });
        }
    });
};

module.exports.uploadImage = async (ctx, next) => {
    try {
        const {id} = ctx.request.query
        let form = formidable.parse(ctx.request);

        function formImage() {
            return new Promise((resolve, reject) => {
                form((opt, {
                    fields,
                    files
                }) => {
                    let url = fields.url;
                    let articleId = fields.articleId;
                    let filename = files.file.name;
                    console.log(files.file.path);
                    let uploadDir = 'public/upload/';
                    let avatarName = Date.now() + '_' + filename;
                    mkdirs('public/upload', function () {
                        fs.renameSync(files.file.path, uploadDir + avatarName); //重命名
                        resolve('/' + uploadDir + avatarName)
                    })
                })
            })
        }
        const url = await formImage()

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