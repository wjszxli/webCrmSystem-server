const mysql = require('../utils/mysql')
const crypto = require('crypto');
const {
    response,
    md5
} = require('../utils/util')

module.exports.saveUserInfo = async (ctx, next) => {
    try {
        const {
            name, // 姓名
            phone, // 手机号码
            dept,
            job, // 职位
            remark
        } = ctx.request.body

        const pwd = md5('123456')
        // 查重并决定是插入还是更新数据
        let res = await mysql('cUser').count('phone as hasUser').where({
            phone
        })
        if (res[0].hasUser) {
            res = await mysql('cUser').update({
                name, // 姓名
                dept,
                job, // 职位
                remark
            }).where({
                phone
            })
        } else {
            res = await mysql('cUser').insert({
                name, // 姓名
                phone, // 手机号码
                dept,
                job, // 职位
                pwd,
                remark
            })
        }
        ctx.body = response('0', {
            tip: '保存成功'
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getUserInfo = async (ctx, next) => {
    try {
        const {
            pageIndex,
            pageSize
        } = ctx.request.query
        let res = await mysql('cUser').limit(pageSize).offset((pageIndex - 1) * pageSize).orderBy('idcUser')
        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getUserCount = async (ctx, next) => {
    try {
        let res = await mysql('cUser').count('idcUser as count')
        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.deleteUser = async (ctx, next) => {
    try {
        const {
            idcUser
        } = ctx.request.body

        await mysql('cUser').where('idcUser', idcUser)
            .del()
        ctx.body = response('0', {
            tip: '删除成功'
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.modifyPwd = async (ctx, next) => {
    try {
        const {
            idcUser,
            oldpwd,
            newpwd
        } = ctx.request.body
        
        const newPassword = md5(newpwd)
        const oldPassword = md5(oldpwd)

        let res = await mysql('cUser').count('phone as hasUser').where({
            idcUser,
            pwd: oldPassword
        })
        
        if (res[0].hasUser) {
            await mysql('cUser').update({
                pwd: newPassword
            }).where({
                idcUser,
                pwd: oldPassword,
            })
            ctx.body = response('0', {
                tip: '密码修改成功'
            })
        } else {
            ctx.body = response('-1', {
                tip: '旧密码输入错入，修改失败'
            })
        }

    } catch (error) {
        throw new Error(error)
    }
}