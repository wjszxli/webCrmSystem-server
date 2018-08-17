const mysql = require('../utils/mysql')
const {
    response
} = require('../utils/util')

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
        ctx.body = response('0', {
            tip: '保存成功'
        })
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getCustomer = async (ctx, next) => {
    try {
        const {
            pageIndex,
            pageSize,
            isDelete,
            customer,
            people,
            isCollaborate
        } = ctx.request.query

        const searchData = {}

        if (isDelete) {
            searchData.isDelete = isDelete
        }
        if (people) {
            searchData.people = people
        }
        if (isCollaborate) {
            searchData.isCollaborate = isCollaborate
        }

        let res = await mysql('cCustomer').limit(pageSize).offset((pageIndex - 1) * pageSize).where(searchData)
            .where(function () {
                if (customer) {
                    this.where('companyName', 'like', `%${customer}%`).orWhere('brand', 'like', `%${customer}%`)
                }
            })

        ctx.body = ctx.body = response('0', res)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getCustomerCount = async (ctx, next) => {
    try {
        const {
            isDelete,
            customer,
            people,
            isCollaborate
        } = ctx.request.query

        const searchData = {}

        if (isDelete) {
            searchData.isDelete = isDelete
        }
        if (people) {
            searchData.people = people
        }
        if (isCollaborate) {
            searchData.isCollaborate = isCollaborate
        }

        let res = await mysql('cCustomer').count('id as count').where(searchData)
            .where(function () {
                if (customer) {
                    this.where('companyName', 'like', `%${customer}%`).orWhere('brand', 'like', `%${customer}%`)
                }
            })
        ctx.body = ctx.body = response('0', res)
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
        ctx.body = response('0', {
            tip
        })
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