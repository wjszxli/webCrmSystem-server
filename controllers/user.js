const mysql = require('../utils/mysql')
const { response } = require ('../utils/util')

module.exports.saveUserInfo = async (ctx, next) => {
    try {
        const {
            openId, // 腾讯开放id
            name, // 姓名
            sex, // 性别
            job, // 职位
            company, // 公司
            phone, // 手机号码
            projectInfo, // 项目简介
            cChatName, // 微信昵称
            isOpen, // 是否对外开放
            companyInfo, // 公司简介
            url, // 网址
            companyphone, // 公司电话
            webchat, // 微信号
            qq,
            mail,
            address,
        } = ctx.request.body

        // 查重并决定是插入还是更新数据
        let res = await mysql('cUserInfo').count('openId as hasUser').where({
            openId
        })
        if (res[0].hasUser) {
            res = await mysql('cUserInfo').update({
                name,
                sex,
                job,
                company,
                phone,
                projectInfo,
                cChatName,
                isOpen,
                companyInfo,
                url,
                companyphone,
                webchat,
                qq,
                mail,
                address,
            }).where({
                openId
            })
        } else {
            res = await mysql('cUserInfo').insert({
                openId,
                name,
                sex,
                job,
                company,
                phone,
                projectInfo,
                cChatName,
                isOpen,
                companyInfo,
                url,
                companyphone,
                webchat,
                qq,
                mail,
                address,
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
            openId
        } = ctx.request.query
        let res = await mysql('cUserInfo').where({
            openId
        })
        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}