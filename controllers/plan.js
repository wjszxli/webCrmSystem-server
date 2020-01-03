const mysql = require('../utils/mysql')
const math = require('mathjs')

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
      customerName,
      userId,
      impost,
      channelImpost,
      rebate
    } = ctx.request.body

    console.log('rebate', rebate)

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
      customername: customerName,
      userid: userId,
      impost,
      channelimpost: channelImpost,
      rebate
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
      endTime,
      tag,
      userId,
      financeReamrk,
      inTimeStartTime,
      inTimeEndTime,
      backTimeStartTime,
      backTimeEndTime
    } = ctx.request.query

    const searchData = {}

    if (isDelete) {
      searchData.isDelete = isDelete
    }
    if (planPeople) {
      const data = await mysql('cUser').where({
        id:planPeople
      })      
      if (data.length) {
        searchData.planPeople = data[0].name
      }      
    }
    if (isBack) {
      searchData.isBack = isBack
    }
    if (isPay) {
      searchData.isPay = isPay
    }
    let res = []
    if (tag) {
      res = await mysql('cPlan').limit(pageSize).offset((pageIndex - 1) * pageSize)
        .where(searchData)
        .where(function() {
          if (publicNumber) {
            this.where('id', publicNumber).orWhere('publicNumber', 'like', `%${publicNumber}%`)
            .orWhere('customerName', 'like', `%${publicNumber}%`)
          }
          if (remark) {
            this.where('remark', 'like', `%${remark}%`)
          }
          if (financeReamrk) {
            this.where('financeReamrk', 'like', `%${financeReamrk}%`)
          }
          if (startTime) {
            this.where('createTime', '>=', startTime)
          }
          if (endTime) {
            this.where('createTime', '<=', endTime)
          }
          if (inTimeStartTime) {
            let startTime = `${new Date(inTimeStartTime).getTime()}`
            startTime = startTime.substr(0, startTime.length - 3)
            this.where('inTime', '>=', startTime)
          }
          if (inTimeEndTime) {
            let endTime = `${new Date(inTimeEndTime).getTime()}`
            endTime = endTime.substr(0, endTime.length - 3)
            this.where('inTime', '<=', endTime)
          }
          if (backTimeStartTime) {
            const startTime = new Date(backTimeStartTime).getTime()
            this.where('backTime', '>=', startTime)
          }
          if (backTimeEndTime) {
            const endTime = new Date(backTimeEndTime).getTime()
            this.where('backTime', '<=', endTime)
          }
          if (tag && tag !== 'all') {
            if (tag === 'self') {
              this.where('userid', '=', userId)
            } else if (tag === 'dept') {
              this.whereIn('userid', function() {
                this.select('id').from('cUser').whereIn('dept', function() {
                  this.select('dept').from('cUser').where({
                    id: userId
                  })
                })
              })
            } else if (tag === 'medium') {
              this.whereIn('publicNumberId', function() {
                this.select('id').from('cPublicNumber').where({
                  userid: userId
                })
              })
            }
          }
        }).orderBy('createTime', 'desc')
    }
    ctx.state.data = res
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.getPlanAll = async (ctx, next) => {
  try {
    const res = await mysql('cPlan')
    ctx.state.data = res
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.getPlanAllSum = async (ctx, next) => {
  try {
    const res = await mysql('cPlan').select(['price','cost','impost','channelImpost','rebate'])

    let price = 0
    let cost = 0
    let profit = 0
    res.forEach(item => {
      price = math.chain(price).add(Number(item.price))
      cost = math.chain(cost).add(Number(item.cost))

      // const profit = Number(item.price) - Number(item.cost) - Number(item.impost) + Number(item.channelImpost) - Number(item.rebate)
      // profit = math.chain(profit).add((math.chain(Number(item.price)).subtract(Number(item.cost)) ))

    })
    const ttt = math.chain(100).subtract(10)
    console.log('ttt', ttt)
    console.log('price', price)
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
      endTime,
      tag,
      userId,
      financeReamrk,
      inTimeStartTime,
      inTimeEndTime,
      backTimeStartTime,
      backTimeEndTime
    } = ctx.request.query

    const searchData = {}

    if (isDelete) {
      searchData.isDelete = isDelete
    }
    if (planPeople) {
      const data = await mysql('cUser').where({
        id:planPeople
      })      
      if (data.length) {
        searchData.planPeople = data[0].name
      }      
    }
    if (isBack) {
      searchData.isBack = isBack
    }
    if (isPay) {
      searchData.isPay = isPay
    }

    let res = [{
      count: 0
    }]
    if (tag) {
      res = await mysql('cPlan').count('id as count')
        .where(searchData)
        .where(function() {
          if (publicNumber) {
            this.where('id', publicNumber).orWhere('publicNumber', 'like', `%${publicNumber}%`)
            .orWhere('customerName', 'like', `%${publicNumber}%`)
          }
          if (remark) {
            this.where('remark', 'like', `%${remark}%`)
          }
          if (startTime) {
            this.where('createTime', '>=', startTime)
          }
          if (endTime) {
            this.where('createTime', '<=', endTime)
          }
          if (financeReamrk) {
            this.where('financeReamrk', 'like', `%${financeReamrk}%`)
          }
          if (inTimeStartTime) {
            let startTime = `${new Date(inTimeStartTime).getTime()}`
            startTime = startTime.substr(0, startTime.length - 3)
            this.where('inTime', '>=', startTime)
          }
          if (inTimeEndTime) {
            let endTime = `${new Date(inTimeEndTime).getTime()}`
            endTime = endTime.substr(0, endTime.length - 3)
            this.where('inTime', '<=', endTime)
          }
          if (backTimeStartTime) {
            const startTime = new Date(backTimeStartTime).getTime()
            this.where('backTime', '>=', startTime)
          }
          if (backTimeEndTime) {
            const endTime = new Date(backTimeEndTime).getTime()
            this.where('backTime', '<=', endTime)
          }
          if (tag && tag !== 'all') {
            if (tag === 'self') {
              this.where('userid', '=', userId)
            } else if (tag === 'dept') {
              this.whereIn('userid', function() {
                this.select('id').from('cUser').whereIn('dept', function() {
                  this.select('dept').from('cUser').where({
                    id: userId
                  })
                })
              })
            } else if (tag === 'medium') {
              this.whereIn('publicNumberId', function() {
                this.select('id').from('cPublicNumber').where({
                  userid: userId
                })
              })
            }
          }
        })
    }
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

    let backTime = new Date().getTime()

    if (type === 1) {
      type = 0
      backTime = ''
    } else if (type === 0) {
      type = 1
    }

    if (ids.length > 0) {
      res = await mysql('cPlan').update({
        isBack: type,
        backTime
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
        isPay: type,
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

module.exports.updatePlan = async (ctx, next) => {
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
      customerName,
      userId,
      id,
      impost,
      channelImpost
    } = ctx.request.body
    if (id) {
      await mysql('cPlan').update({
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
        customername: customerName,
        userid: userId,
        impost,
        channelimpost: channelImpost
      }).where({
        id
      })
    }
    ctx.state.data = {
      tip: '保存成功'
    }
  } catch (error) {
    throw new Error(error)
  }
}