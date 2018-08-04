/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()
const controllers = require('../controllers')

// 填写用户信息
router.post('/saveUserInfo', controllers.user.saveUserInfo)

//  获取用户信息
router.get('/getUserInfo', controllers.user.getUserInfo)

module.exports = router
