const mysql = require('../utils/mysql')
const {
    isLogin
} = require('../utils/util')
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
            remark,
            isDeptAdmin
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
                remark,
                isdeptadmin: isDeptAdmin
            }).where({
                phone
            })
        } else {
            let openId = `123456${new Date().getTime()}${phone}`
            openId = md5(openId)
            res = await mysql('cUser').insert({
                name, // 姓名
                phone, // 手机号码
                dept,
                job, // 职位
                pwd,
                remark,
                openId
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
        isLogin(ctx, next)
        const {
            pageIndex,
            pageSize
        } = ctx.request.query
        let res = await mysql('cUser').limit(pageSize).offset((pageIndex - 1) * pageSize).orderBy('id')
        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getAllUserInfo = async (ctx, next) => {
    try {
        const res = await mysql('cUser')
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getUserCount = async (ctx, next) => {
    try {
        let res = await mysql('cUser').count('id as count')
        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.deleteUser = async (ctx, next) => {
    try {
        const {
            id
        } = ctx.request.body

        await mysql('cUser').where('id', id)
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
            id,
            oldpwd,
            newpwd
        } = ctx.request.body

        const newPassword = md5(newpwd)
        const oldPassword = md5(oldpwd)

        let openId = newpwd + new Date().getTime() + phone
        openId = md5(openId)

        let res = await mysql('cUser').count('phone as hasUser').where({
            id,
            pwd: oldPassword
        })

        if (res[0].hasUser) {
            await mysql('cUser').update({
                pwd: newPassword,
                openId
            }).where({
                id,
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

module.exports.getOneUser = async (ctx, next) => {
    try {
        let {
            id
        } = ctx.request.query
        const res = await mysql('cUser').where({
            id
        })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.login = async (ctx, next) => {
    try {
        let {
            password,
            phone
        } = ctx.request.body

        password = md5(password)

        const res = await mysql('cUser').select('name', 'phone', 'dept', 'job', 'openId').where({
            phone,
            pwd: password
        })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}