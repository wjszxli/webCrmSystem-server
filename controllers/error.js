const mysql = require('../utils/mysql')
const {
    response
} = require('../utils/util')


module.exports.notFind = async (ctx, next) => {
    try {
        ctx.status = 404
        ctx.state.data = {
            tip: '页面丢失了'
        }
    } catch (error) {
        throw new Error(error)
    }
}