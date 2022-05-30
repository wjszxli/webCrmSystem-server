/**
 * ajax 服务路由集合
 */
const router = require("koa-router")({
  prefix: "/api",
});
const controllers = require("../controllers");

// 填写用户信息
router.post("/saveUserInfo", controllers.user.saveUserInfo);

//  获取用户信息
router.get("/getUserInfo", controllers.user.getUserInfo);

// 获取数据条数
router.get("/getUserCount", controllers.user.getUserCount);

// 删除数据
router.post("/deleteUser", controllers.user.deleteUser);

// 修改密码
router.post("/modifyPwd", controllers.user.modifyPwd);

// 保存客户信息
router.post("/saveCustomer", controllers.customer.saveCustomer);

// 获取客户信息
router.get("/getCustomer", controllers.customer.getCustomer);

// 获取客户信息数量
router.get("/getCustomerCount", controllers.customer.getCustomerCount);

// 删除客户数据
router.post("/deleteCustomer", controllers.customer.deleteCustomer);

// 获取一条客户数据
router.get("/getOneCustomer", controllers.customer.getOneCustomer);

// 登录
router.post("/login", controllers.user.login);

// 获取一个用户信息
router.get("/getOneUser", controllers.user.getOneUser);

// 保存公众号信息
router.post("/savePublicNumber", controllers.publicNumber.savePublicNumber);

router.get("/getPublicNumber", controllers.publicNumber.getPublicNumber);

router.get(
  "/getPublicNumberCount",
  controllers.publicNumber.getPublicNumberCount
);

router.post("/savePlan", controllers.plan.savePlan);

router.get("/getPlan", controllers.plan.getPlan);

router.get("/getPlanAll", controllers.plan.getPlanAll);

router.get("/getPlanAllSum", controllers.plan.getPlanAllSum);

router.get("/getPlanCount", controllers.plan.getPlanCount);

router.post("/deletePlan", controllers.plan.deletePlan);

router.post("/updatePlanBack", controllers.plan.updatePlanBack);

router.post("/updatePlanPay", controllers.plan.updatePlanPay);

router.get("/getOnePlan", controllers.plan.getOnePlan);

router.post("/follow", controllers.customer.follow);

router.get("/getAllCustomer", controllers.customer.getAllCustomer);

router.get("/getCustomerLike", controllers.customer.getCustomerLike);

router.post("/addFinance", controllers.plan.addFinance);

router.post("/addInDetail", controllers.publicNumber.addInDetail);

router.get("/getOnePublicNumber", controllers.publicNumber.getOnePublicNumber);

router.post("/uploadImage", controllers.upload.uploadImage);

router.get("/public/upload/*", controllers.upload.getImage);

router.post("/updatePublicNumber", controllers.publicNumber.updatePublicNumber);

router.get("/getAuthor", controllers.author.getAuthor);

router.get("/getAuthorCount", controllers.author.getAuthorCount);

router.get("/getDept", controllers.dept.getDept);

router.get("/getDeptCount", controllers.dept.getDeptCount);

router.get("/getAllUserInfo", controllers.user.getAllUserInfo);

router.post("/updateAuthor", controllers.author.updateAuthor);

router.get("/isAuthor", controllers.author.isAuthor);

router.get("/getDataById", controllers.author.getDataById);

router.post("/updatePlan", controllers.plan.updatePlan);

router.post("/deletePublicNumber", controllers.publicNumber.deletePublicNumber);

router.post("/updateImg", controllers.publicNumber.updateImg);

router.post("/changeData", controllers.publicNumber.changeData);

// 处理404
// router.post('*', controllers.error.notFind)
// router.get('*', controllers.error.notFind)

router.post("/saveNotification", controllers.notification.saveNotification);

router.get("/getNotification", controllers.notification.getNotification);

router.get(
  "/getNotificationCount",
  controllers.notification.getNotificationCount
);

router.post("/addInDetail", controllers.notification.addInDetail);

router.get("/getOneNotification", controllers.notification.getOneNotification);

router.post("/updateNotification", controllers.notification.updateNotification);

router.post("/deleteNotification", controllers.notification.deleteNotification);

// -------------------------------------------------------

router.post("/saveWeibo", controllers.weibo.saveWeibo);

router.get("/getWeibo", controllers.weibo.getWeibo);

router.get("/getWeiboCount", controllers.weibo.getWeiboCount);

router.post("/addInDetail", controllers.weibo.addInDetail);

router.get("/getOneWeibo", controllers.weibo.getOneWeibo);

router.post("/updateWeibo", controllers.weibo.updateWeibo);

router.post("/deleteWeibo", controllers.weibo.deleteWeibo);

// -------------------------------------------------------

router.post("/savePlay", controllers.play.savePlay);

router.get("/getPlay", controllers.play.getPlay);

router.get("/getPlayCount", controllers.play.getPlayCount);

router.post("/addInDetail", controllers.play.addInDetail);

router.get("/getOnePlay", controllers.play.getOnePlay);

router.post("/updatePlay", controllers.play.updatePlay);

router.post("/deletePlay", controllers.play.deletePlay);

// -------------------------------------------------------

router.post("/saveColonel", controllers.colonel.saveColonel);

router.get("/getColonel", controllers.colonel.getColonel);

router.get("/getColonelCount", controllers.colonel.getColonelCount);

router.post("/addInDetail", controllers.colonel.addInDetail);

router.get("/getOneColonel", controllers.colonel.getOneColonel);

router.post("/updateColonel", controllers.colonel.updateColonel);

router.post("/deleteColonel", controllers.colonel.deleteColonel);

// -------------------------------------------------------

router.post("/saveCamera", controllers.camera.saveCamera);

router.get("/getCamera", controllers.camera.getCamera);

router.get("/getCameraCount", controllers.camera.getCameraCount);

router.post("/addInDetail", controllers.camera.addInDetail);

router.get("/getOneCamera", controllers.camera.getOneCamera);

router.post("/updateCamera", controllers.camera.updateCamera);

router.post("/deleteCamera", controllers.camera.deleteCamera);

module.exports = router;
