/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()
const controllers = require('../controllers')

// 填写用户信息
router.post('/saveUserInfo', controllers.user.saveUserInfo)

//  获取用户信息
router.get('/getUserInfo', controllers.user.getUserInfo)

// 获取数据条数
router.get('/getUserCount', controllers.user.getUserCount)

// 删除数据
router.post('/deleteUser', controllers.user.deleteUser)

// 修改密码
router.post('/modifyPwd', controllers.user.modifyPwd)

// 保存客户信息
router.post('/saveCustomer', controllers.customer.saveCustomer)

// 获取客户信息
router.get('/getCustomer', controllers.customer.getCustomer)

// 获取客户信息数量
router.get('/getCustomerCount', controllers.customer.getCustomerCount)

// 删除客户数据
router.post('/deleteCustomer', controllers.customer.deleteCustomer)

// 获取一条客户数据
router.get('/getOneCustomer', controllers.customer.getOneCustomer)
module.exports = router
