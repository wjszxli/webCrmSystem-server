const mysql = require('../utils/mysql')
const {
    response
} = require('../utils/util')

module.exports.savePlan = async (ctx, next) => {
    try {
        const {
            publicNumber,
            location,
            inTime,
            price,
            cost,
            isInvoiceClient,
            taxClient,
            isInvoiceRouter,
            taxRouter,
            remark,
            publicNumberId,
            planPeople,
            customer,
            customerName
        } = ctx.request.body

        console.log('rrrr', ctx.request.body)
        await mysql('cPlan').insert({
            publicnumber: publicNumber,
            location,
            intime: inTime,
            price,
            cost,
            customer,
            isinvoiceclient: isInvoiceClient,
            taxclient: taxClient,
            isinvoicerouter: isInvoiceRouter,
            taxrouter: taxRouter,
            remark,
            publicnumberid: publicNumberId,
            planpeople: planPeople,
            customername: customerName
        })
        if (publicNumberId) {
            const res = await mysql('cPublicNumber')
                .where({
                    id: publicNumberId
                })
            if (res.length) {
                await mysql('cPublicNumber')
                    .update({
                        plancount: res[0].planCount + 1
                    })
                    .where({
                        id: publicNumberId
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

module.exports.getPlan = async (ctx, next) => {
    try {
        const {
            pageIndex,
            pageSize,
            isDelete,
            publicNumber,
            planPeople,
            isBack,
            isPay,
            remark,
            startTime,
            endTime
        } = ctx.request.query

        const searchData = {}

        if (isDelete) {
            searchData.isDelete = isDelete
        }
        if (planPeople) {
            searchData.planPeople = planPeople
        }
        if (isBack) {
            searchData.isBack = isBack
        }
        if (isPay) {
            searchData.isPay = isPay
        }
        console.log('pageSize', pageSize)
        console.log('pageIndex', pageIndex)

        let res = await mysql('cPlan').limit(pageSize).offset((pageIndex - 1) * pageSize)
            .where(searchData)
            .where(function () {
                if (publicNumber) {
                    this.where('id', publicNumber).orWhere('publicNumber', 'like', `%${publicNumber}%`)
                }
                if (remark) {
                    this.where('remark', 'like', `%${remark}%`)
                }
                if (startTime) {
                    this.where('createTime', '>', startTime)
                }
                if (endTime) {
                    this.where('createTime', '<', endTime)
                }
            })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.getPlanCount = async (ctx, next) => {
    try {
        const {
            isDelete,
            publicNumber,
            planPeople,
            isBack,
            isPay,
            remark,
            startTime,
            endTime
        } = ctx.request.query

        const searchData = {}

        if (isDelete) {
            searchData.isDelete = isDelete
        }
        if (planPeople) {
            searchData.planPeople = planPeople
        }
        if (isBack) {
            searchData.isBack = isBack
        }
        if (isPay) {
            searchData.isPay = isPay
        }

        let res = await mysql('cPlan').count('id as count')
            .where(searchData)
            .where(function () {
                if (publicNumber) {
                    this.where('id', publicNumber).orWhere('publicNumber', 'like', `%${publicNumber}%`)
                }
                if (remark) {
                    this.where('remark', 'like', `%${remark}%`)
                }
                if (startTime) {
                    this.where('createTime', '>', startTime)
                }
                if (endTime) {
                    this.where('createTime', '<', endTime)
                }
            })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.deletePlan = async (ctx, next) => {
    try {
        const {
            ids,
            isDelete
        } = ctx.request.body
        if (ids.length > 0) {
            res = await mysql('cPlan').update({
                isDelete
            }).whereIn('id', ids)
        }
        const tip = '删除成功'
        ctx.state.data = {
            tip
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updatePlanBack = async (ctx, next) => {
    try {
        let {
            ids,
            type
        } = ctx.request.body

        if (type === 1) {
            type = 0
        } else if (type === 0) {
            type = 1
        }

        if (ids.length > 0) {
            res = await mysql('cPlan').update({
                isBack: type
            }).whereIn('id', ids)
        }
        const tip = '操作成功'
        ctx.state.data = {
            tip
        }
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.updatePlanPay = async (ctx, next) => {
    try {
        let {
            ids,
            type
        } = ctx.request.body

        if (type === 1) {
            type = 0
        } else if (type === 0) {
            type = 1
        }

        if (ids.length > 0) {
            res = await mysql('cPlan').update({
                isPay: type
            }).whereIn('id', ids)
        }
        const tip = '操作成功'
        ctx.state.data = {
            tip
        }
    } catch (error) {
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

module.exports.getOnePlan = async (ctx, next) => {
    try {
        const {
            id
        } = ctx.request.query

        const res = await mysql('cPlan').where({
            id
        })
        ctx.state.data = res
    } catch (error) {
        throw new Error(error)
    }
}

module.exports.addFinance = async (ctx, next) => {
    try {
        const {
            id,
            financeReamrk
        } = ctx.request.body

        const res = await mysql('cPlan')
            .update({
                financereamrk: financeReamrk
            })
            .where({
                id
            })
        ctx.state.data = {
            tip: '添加财务备注成功'
        }
    } catch (error) {
        throw new Error(error)
    }
}