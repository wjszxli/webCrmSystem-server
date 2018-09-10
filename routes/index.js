/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/api'
})
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

// 登录
router.post('/login', controllers.user.login)

// 获取一个用户信息
router.get('/getOneUser', controllers.user.getOneUser)

// 保存公众号信息
router.post('/savePublicNumber', controllers.publicNumber.savePublicNumber)

router.get('/getPublicNumber', controllers.publicNumber.getPublicNumber)

router.get('/getPublicNumberCount', controllers.publicNumber.getPublicNumberCount)

router.post('/savePlan', controllers.plan.savePlan)

router.get('/getPlan', controllers.plan.getPlan)

router.get('/getPlanCount', controllers.plan.getPlanCount)

router.post('/deletePlan', controllers.plan.deletePlan)

router.post('/updatePlanBack', controllers.plan.updatePlanBack)

router.post('/updatePlanPay', controllers.plan.updatePlanPay)

router.get('/getOnePlan', controllers.plan.getOnePlan)

router.post('/follow', controllers.customer.follow)

router.get('/getAllCustomer', controllers.customer.getAllCustomer)

router.post('/addFinance', controllers.plan.addFinance)

router.post('/addInDetail', controllers.publicNumber.addInDetail)

router.get('/getOnePublicNumber', controllers.publicNumber.getOnePublicNumber)

router.post('/uploadImage', controllers.upload.uploadImage)

router.get('/public/upload/*.png', controllers.upload.getImage)

router.post('/updatePublicNumber', controllers.publicNumber.updatePublicNumber)

router.get('/getAuthor', controllers.author.getAuthor)

router.get('/getAuthorCount', controllers.author.getAuthorCount)

router.get('/getDept', controllers.dept.getDept)

router.get('/getDeptCount', controllers.dept.getDeptCount)

// 处理404
// router.post('*', controllers.error.notFind)
// router.get('*', controllers.error.notFind)

module.exports = router
