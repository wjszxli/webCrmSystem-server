const mysql = require('../utils/mysql')

module.exports.saveCustomer = async (ctx, next) => {
    try {
        const {
            companyName,
            brand,
            connect,
            phone,
            webchat,
            qq,
            isCollaborate,
            people
        } = ctx.request.body

        await mysql('cCustomer').insert({
            companyName,
            brand,
            connect,
            phone,
            webchat,
            qq,
            isCollaborate,
            people
        })
        ctx.state.data = {
            tip: '保存成功'
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getDept = async (ctx, next) => {
    try {
        const {
            pageIndex,
            pageSize,
        } = ctx.request.query

        const res = await mysql('cDept').limit(pageSize).offset((pageIndex - 1) * pageSize)

        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getDeptCount = async (ctx, next) => {
    try {

        const res = await mysql('cDept').count('id as count')
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.deleteCustomer = async (ctx, next) => {
    try {
        const {
            id,
            isDelete
        } = ctx.request.body
        console.log('isDelete', isDelete)
        res = await mysql('cCustomer').update({
            isDelete
        }).where({
            id
        })
        let tip = '捡起成功'
        if (isDelete) {
            tip = '删除成功'
        }
        ctx.state.data = {
            tip
        }
    } catch (error) {
        console.log('error', error)
        throw new Error(error)
    }
}

module.exports.getOneCustomer = async (ctx, next) => {
    try {
        const {
            id
        } = ctx.request.query
        res = await mysql('cCustomer').where({
            id
        })
        ctx.state.data = res
    } catch (error) {
        console.log('error', error)
        throw new Error(error)
    }
}


module.exports.getAllCustomer = async (ctx, next) => {
    let res = await mysql('cCustomer')
    .where({
        isDelete:0
    })
    ctx.state.data = res
}