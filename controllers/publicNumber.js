const mysql = require('../utils/mysql')
const {
  isLogin
} = require('../utils/util')

module.exports.savePublicNumber = async (ctx, next) => {
  try {
    isLogin(ctx, next)
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
      operation,
      brush,
      type,
      updateRouter,
      userId,
      remark
    } = ctx.request.body
    if (operation === 'add') {
      let res = []
      if (dataId) {
        res = await mysql('cPublicNumber').where({
          dataid: dataId
        })
      }
      const updateTime = new Date()
      if (res.length === 0 || !dataId) {
        await mysql('cPublicNumber').insert({
          name,
          dataid: dataId,
          star,
          toptitle: topTitle,
          topcost: topCost,
          secondtitle: secondTitle,
          secondcost: secondCost,
          lasttitle: lastTitle,
          lastcost: lastCost,
          womenratio: womenRatio,
          updaterouter: updateRouter,
          userid: userId,
          updatetime:updateTime,
          type,
          brush,
          remark
        })
      }
    } else if (operation === 'update') {
      await mysql('cPublicNumber').update({
        name,
        star,
        toptitle: topTitle,
        topcost: topCost,
        secondtitle: secondTitle,
        secondcost: secondCost,
        lasttitle: lastTitle,
        lastcost: lastCost,
        womenratio: womenRatio,
        updaterouter: updateRouter,
        userid: userId,
        brush,
        type,
        remark
      }).where({
        dataid: dataId
      })
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
    isLogin(ctx, next)
    const {
      pageIndex,
      pageSize,
      publicNumber,
      type,
      starS,
      starE,
      brush,
      womenRatioS,
      womenRatioE,
      tag,
      userId,
    } = ctx.request.query
    const searchData = {}

    if (type) {
      searchData.type = type
    }
    let res = []
    if (tag) {
      res = await mysql('cPublicNumber').limit(pageSize).offset((pageIndex - 1) * pageSize)
        .where(searchData)
        .where(function() {
          if (publicNumber) {
            this.where('name', 'like', `%${publicNumber}%`)
          }
          if (starS) {
            this.where('star', '>', starS)
          }
          if (starE) {
            this.where('star', '<', starE)
          }
          if (womenRatioS) {
            this.where('womenRatio', '>', womenRatioS)
          }
          if (womenRatioE) {
            this.where('womenRatio', '>', womenRatioE)
          }
          if (brush) {
            this.where('brush', '=', brush)
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
            }
          }
        })
    }
    ctx.state.data = res

  } catch (error) {
    throw new Error(error)
  }
}

module.exports.getPublicNumberCount = async (ctx, next) => {
  try {
    isLogin(ctx, next)
    const {
      publicNumber,
      type,
      starS,
      starE,
      womenRatioS,
      womenRatioE,
      tag,
      userId,
    } = ctx.request.query
    const searchData = {}

    if (type) {
      searchData.type = type
    }
    let res = [{
      count: 0
    }]
    if (tag) {
      res = await mysql('cPublicNumber').count('id as count')
        .where(searchData)
        .where(function() {
          if (publicNumber) {
            this.where('name', 'like', `%${publicNumber}%`)
          }
          if (starS) {
            this.where('star', '>', starS)
          }
          if (starE) {
            this.where('star', '<', starE)
          }
          if (womenRatioS) {
            this.where('womenRatio', '>', womenRatioS)
          }
          if (womenRatioE) {
            this.where('womenRatio', '>', womenRatioE)
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
            }
          }
        })
    }
    ctx.state.data = res
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.deletePublicNumber = async (ctx, next) => {
  try {
    isLogin(ctx, next)
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
    isLogin(ctx, next)
    const {
      id
    } = ctx.request.query
    res = await mysql('cPublicNumber').where({
      id
    })
    ctx.state.data = res
  } catch (error) {
    console.log('error', error)
    throw new Error(error)
  }
}

module.exports.addInDetail = async (ctx, next) => {
  try {
    const {
      id,
      inDetail
    } = ctx.request.body

    await mysql('cPublicNumber')
      .update({
        indetail: inDetail
      })
      .where({
        id
      })
    ctx.state.data = {
      tip: '添加投入详情成功'
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports.updatePublicNumber = async (ctx, next) => {
  try {
    isLogin(ctx, next)
    const {
      id,
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
      brush,
      type,
      updateRouter
    } = ctx.request.body
    const res = await mysql('cPublicNumber').where({
      id
    })
    let updateTime = ''
    if (res) {
      if (res[0].topCost !== topCost || res[0].secondCost !== secondCost || res[0].lastCost !== lastCost) {
        updateTime = new Date()
      }
    }
    if (id) {
      const updateObj = {
        name,
        star,
        dataid: dataId,
        toptitle: topTitle,
        topcost: topCost,
        secondtitle: secondTitle,
        secondcost: secondCost,
        lasttitle: lastTitle,
        lastcost: lastCost,
        womenratio: womenRatio,
        updateRouter: updateRouter,
        brush,
        type
      }
      if (updateTime) {
        updateObj.updateTime = updateTime
      }
      await mysql('cPublicNumber')
        .update(updateObj).where({
          id
        })
    }
    ctx.state.data = {
      tip: '修改成功'
    }
  } catch (error) {
    throw new Error(error)
  }
}