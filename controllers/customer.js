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
      people,
      userId,
      isAdd,
      id
    } = ctx.request.body
    if (isAdd) {
      const data = await mysql('cCustomer').where({ companyName })
      if (data.length > 0) {
        ctx.state.data = {
          tip: '该客户已存在！'
        }
        return false
      }
      await mysql('cCustomer').insert({
        companyName,
        brand,
        connect,
        phone,
        webchat,
        qq,
        isCollaborate,
        people,
        userid: userId
      })
    } else {
      await mysql('cCustomer').update({
        companyName,
        brand,
        connect,
        phone,
        webchat,
        qq,
        isCollaborate,
        people,
        userid: userId
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

module.exports.getCustomer = async (ctx, next) => {
  try {
    const {
      pageIndex,
      pageSize,
      isDelete,
      customer,
      people,
      isCollaborate,
      tag,
      userId
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
        if (tag && tag !== 'all') {
          if (tag === 'self') {
            this.where('userid', '=', userId)
          } else if (tag === 'dept') {
            this.whereIn('userid', function () {
              this.select('id').from('cUser').whereIn('dept', function () {
                this.select('dept').from('cUser').where({
                  id: userId
                })
              })
            })
          }
        }
      })

    ctx.state.data = res
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
    // ctx.status = 401
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

module.exports.follow = async (ctx, next) => {
  try {
    const {
      id,
      remark
    } = ctx.request.body

    await mysql('cCustomer').update({
      remark
    })
      .where({
        id
      })
    ctx.state.data = {
      tip: '跟进成功'
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.getAllCustomer = async (ctx, next) => {
  let res = await mysql('cCustomer')
    .where({
      isDelete: 0
    })
  ctx.state.data = res
}