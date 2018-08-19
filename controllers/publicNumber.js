const mysql = require('../utils/mysql')

module.exports.savePublicNumber = async (ctx, next) => {
    try {
        const {
            name,
            dataId,
            star,
            topTitle,
            topCost,
            secondTitle,
            secondCost,
            lastTitle,
            lastCost,
            womenRatio,
            operation
        } = ctx.request.body
        if (dataId) {
            if (operation==='add') {
                await mysql('cPublicNumber').insert({
                    name,
                    dataid:dataId,
                    star,
                    toptitle: topTitle,
                    topcost: topCost,
                    secondtitle: secondTitle,
                    secondcost: secondCost,
                    lasttitle: lastTitle,
                    lastcost: lastCost,
                    womenratio: womenRatio
                })
            } else if (operation==='update') {
                await mysql('cPublicNumber').update({
                    name,
                    star,
                    toptitle: topTitle,
                    topcost: topCost,
                    secondtitle: secondTitle,
                    secondcost: secondCost,
                    lasttitle: lastTitle,
                    lastcost: lastCost,
                    womenratio: womenRatio
                }).where({
                    dataid:dataId
                })
            }
        }
        ctx.state.data = {
            tip: '保存成功'
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getPublicNumber = async (ctx, next) => {
    try {
        const {
            pageIndex,
            pageSize,
        } = ctx.request.query

        const res = await mysql('cPublicNumber').limit(pageSize).offset((pageIndex - 1) * pageSize)
        // .where(searchData)
        ctx.state.data = res

    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getPublicNumberCount = async (ctx, next) => {
    try {
        // const {
        //     isDelete,
        //     customer,
        //     people,
        //     isCollaborate
        // } = ctx.request.query

        // const searchData = {}

        // if (isDelete) {
        //     searchData.isDelete = isDelete
        // }
        // if (people) {
        //     searchData.people = people
        // }
        // if (isCollaborate) {
        //     searchData.isCollaborate = isCollaborate
        // }

        const res = await mysql('cPublicNumber').count('id as count')
        // .where(searchData)
        //     .where(function () {
        //         if (customer) {
        //             this.where('companyName', 'like', `%${customer}%`).orWhere('brand', 'like', `%${customer}%`)
        //         }
        //     })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.deletePublicNumber = async (ctx, next) => {
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

module.exports.getOnePublicNumber = async (ctx, next) => {
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