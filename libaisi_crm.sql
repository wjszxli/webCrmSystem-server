/*
 Navicat MySQL Data Transfer

 Source Server         : location
 Source Server Type    : MySQL
 Source Server Version : 50710
 Source Host           : localhost:3306
 Source Schema         : libaisi_crm

 Target Server Type    : MySQL
 Target Server Version : 50710
 File Encoding         : 65001

 Date: 25/09/2018 17:55:38
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cAuthor
-- ----------------------------
DROP TABLE IF EXISTS `cAuthor`;
CREATE TABLE `cAuthor` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `remark` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL,
  `user` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cAuthor
-- ----------------------------
BEGIN;
INSERT INTO `cAuthor` VALUES (1, 'finance', '财务权限', '18,19');
INSERT INTO `cAuthor` VALUES (2, 'medium', '媒介权限', NULL);
INSERT INTO `cAuthor` VALUES (3, 'sell', '销售权限', NULL);
INSERT INTO `cAuthor` VALUES (4, 'charge', '主管权限', NULL);
INSERT INTO `cAuthor` VALUES (5, 'master', '创始人权限', '18');
COMMIT;

-- ----------------------------
-- Table structure for cCustomer
-- ----------------------------
DROP TABLE IF EXISTS `cCustomer`;
CREATE TABLE `cCustomer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(45) NOT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `connect` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `webchat` varchar(45) DEFAULT NULL,
  `qq` varchar(45) DEFAULT NULL,
  `isCollaborate` int(11) DEFAULT NULL,
  `people` varchar(45) DEFAULT NULL,
  `isDelete` int(11) DEFAULT '0',
  `remark` varchar(1000) DEFAULT NULL,
  `customer` varchar(45) DEFAULT NULL,
  `isDeptAdmin` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cCustomer
-- ----------------------------
BEGIN;
INSERT INTO `cCustomer` VALUES (9, '公司名称', '客户品牌', '联系人', '电话', '微信', 'qq', 1, '跟进人', 0, '33333\n33322\n233\n2323\n2332\n2322323', NULL, 0);
INSERT INTO `cCustomer` VALUES (10, '杭州京东', '京东', '何家豪', '18870420552', '', '', 0, '', 0, '3333', NULL, 0);
INSERT INTO `cCustomer` VALUES (11, '娃哈哈', '水果', '联系我', '1', '1', '1', 1, '1', 0, NULL, NULL, 0);
INSERT INTO `cCustomer` VALUES (12, '测试合作', '品牌', '你好', '333', '33', '333', 0, '333', 0, NULL, NULL, 0);
INSERT INTO `cCustomer` VALUES (13, '公司名称', '2', '2222', '2222', '233', '23', 0, '23', 0, NULL, NULL, 0);
INSERT INTO `cCustomer` VALUES (14, '4444', '444', '444', '444', '444', '4444', 0, '444', 1, NULL, NULL, 0);
INSERT INTO `cCustomer` VALUES (15, '公司名称1', '客户品牌', '联系人', '电话', '微信', 'qq', 1, '跟进人', 0, NULL, NULL, 0);
INSERT INTO `cCustomer` VALUES (16, '公司名称1', '客户品牌2', '联系人', '电话', '微信', 'qq', 1, '跟进人', 0, NULL, NULL, 0);
COMMIT;

-- ----------------------------
-- Table structure for cDept
-- ----------------------------
DROP TABLE IF EXISTS `cDept`;
CREATE TABLE `cDept` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `deptName` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `deptId` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `remark` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  `master` varchar(45) CHARACTER SET utf8mb4 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cDept
-- ----------------------------
BEGIN;
INSERT INTO `cDept` VALUES (1, '研发部', 'produce', '研发部门', NULL);
COMMIT;

-- ----------------------------
-- Table structure for cPlan
-- ----------------------------
DROP TABLE IF EXISTS `cPlan`;
CREATE TABLE `cPlan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `publicNumber` varchar(105) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `inTime` varchar(100) DEFAULT NULL,
  `price` varchar(45) DEFAULT NULL,
  `cost` varchar(45) DEFAULT NULL,
  `isInvoiceClient` int(11) DEFAULT NULL,
  `taxClient` varchar(45) DEFAULT NULL,
  `isInvoiceRouter` int(11) DEFAULT NULL,
  `taxRouter` varchar(45) DEFAULT NULL,
  `remark` varchar(145) DEFAULT NULL,
  `publicNumberId` varchar(45) DEFAULT NULL,
  `planPeople` varchar(45) DEFAULT NULL,
  `createTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `isPay` int(11) DEFAULT '0',
  `isBack` int(11) DEFAULT '0',
  `isDelete` int(11) DEFAULT '0',
  `customer` varchar(45) DEFAULT NULL,
  `customerName` varchar(100) DEFAULT NULL,
  `financeReamrk` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPlan
-- ----------------------------
BEGIN;
INSERT INTO `cPlan` VALUES (1, '333', 'top', '1534689459', '33', '33', 1, '3', 0, '6', '3333', NULL, NULL, '2018-08-20 00:06:46', 0, 0, 0, NULL, NULL, '3333\n这也是财务备注\n这还是财务备注\n财务备注');
INSERT INTO `cPlan` VALUES (2, 'rrr', 'second', '1534690608', '23', '2', 1, '3', 0, '6', '2222', '32', NULL, '2018-08-20 00:06:46', 1, 1, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (3, '公众号', 'second', '1534693436', '23', '12', 1, '3', 0, '6', '输入', '34', '管理员', '2018-08-20 00:06:46', 1, 1, 1, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (4, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', '32', '管理员', '2018-08-20 00:13:20', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (5, '开始公众号', 'top', '1534696410', '233', '1', 1, '3', 0, '6', '2', '32', '管理员', '2018-08-20 00:33:42', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (6, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', NULL, '管理员', '2018-08-20 01:05:00', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (7, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', NULL, '管理员', '2018-08-20 01:05:23', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (8, 'yyyy', 'top', '1535643863', '3', '4', 1, '3', 0, '6', '3333', '32', '管理员', '2018-08-30 23:44:37', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (9, '你好的', 'second', '1535643891', '23', '23', 0, '6', 0, '3', '2323', '34', '管理员', '2018-08-30 23:45:04', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (10, '2323', 'top', '1535643917', '43', '2', 1, '3', 0, '6', '', '33', '管理员', '2018-08-30 23:45:31', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (11, '3566666', 'top', '1535643936', '322', '1', 1, '3', 0, '6', '33333', '33', '管理员', '2018-08-30 23:45:49', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (12, 'ttttttt', 'top', '1535644256', '34', '3', 0, '3', 0, '6', '3333', '33', '管理员', '2018-08-30 23:51:09', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (13, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:21:16', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (14, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:21:44', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (15, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:21:48', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (16, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:21:52', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (17, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:21:55', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (18, '444', 'top', '1535728863', '3', '3', 0, '6', 1, '3', '3333', '32', '管理员', '2018-08-31 23:22:19', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (19, '333', 'second', '1534260148', '2', '3', 0, '3', 1, '6', '333', '32', '管理员', '2018-08-31 23:22:39', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (20, '公众号', 'top', '1535729071', '2', '2', 1, '3', 0, '6', '22', '42', '管理员', '2018-08-31 23:24:43', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (21, '晓莉', 'second', '1535815640', '2', '3', 0, '3', 1, '6', '3', '42', '管理员', '2018-08-31 23:27:32', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (22, '测试公众号', 'top', '1535990078', '1', '2', 0, '3', 1, '6', '111', '0', '管理员', '2018-09-03 23:54:52', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (23, '测试公众号', 'top', '1536076576', '3', '2', 0, '6', 1, '3', '222', '0', '管理员', '2018-09-03 23:56:43', 0, 0, 0, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (24, '测试公众号', 'second', '1537459064', '3', '3', 1, '3', 0, '6', '3', '0', '管理员', '2018-09-03 23:59:07', 0, 0, 0, '12', NULL, NULL);
INSERT INTO `cPlan` VALUES (25, '测试公众号', 'second', '1535991057', '3', '2', 0, '6', 1, '3', '111', '0', '管理员', '2018-09-04 00:11:13', 0, 0, 0, '11', '娃哈哈', NULL);
INSERT INTO `cPlan` VALUES (26, '测试公众号', 'top', '1536072270', '34', '2', 0, '3', 0, '6', '这是备注', '0', '管理员', '2018-09-04 22:44:43', 0, 0, 0, '10', '杭州京东', NULL);
INSERT INTO `cPlan` VALUES (27, '测试公众号的数据啊', 'top', '1536327177', '3', '3', 1, '3', 0, '6', '4444', '2', '管理员', '2018-09-07 21:33:06', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (28, '胖少女晚托班', 'top', '1536327335', '34', '3', 1, '3', 0, '6', '333', '2', '管理员', '2018-09-07 21:35:44', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (29, '小思成长日记', 'second', '1536327443', '3', '2', 1, '3', 0, '6', '333', '3', '管理员', '2018-09-07 21:37:29', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (30, '小思成长日记', 'second', '1536327503', '3', '34', 1, '6', 0, '3', '333', '3', '管理员', '2018-09-07 21:38:32', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (31, '小思成长日记', 'top', '1536327575', '23', '2', 0, '3', 1, '6', '2222', '3', '管理员', '2018-09-07 21:39:44', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (32, '小思成长日记', 'top', '1536327618', '3', '3', 1, '3', 0, '6', '333', '3', '管理员', '2018-09-07 21:40:24', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (33, '小思成长日记', 'top', '1536327665', '2', '2', 1, '6', 0, '3', '222', '3', '管理员', '2018-09-07 21:41:18', 0, 0, 0, '10', '杭州京东', NULL);
INSERT INTO `cPlan` VALUES (34, '测试公众号', 'top', '1538055727', '23', '2', 1, '3', 0, '6', '2222', '1', '管理员', '2018-09-07 21:42:20', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (35, '测试公众号', 'top', '1536327835', '2', '2', 0, '3', 1, '6', '', '1', '管理员', '2018-09-07 21:44:06', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (36, '测试公众号', 'top', '1536327944', '2', '3', 1, '3', 0, '6', '222', '1', '管理员', '2018-09-07 21:45:56', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (37, '小思成长日记', 'top', '1536328061', '3', '3', 1, '3', 0, '6', '333', '35', '管理员', '2018-09-07 21:47:53', 0, 0, 0, '9', '公司名称', NULL);
INSERT INTO `cPlan` VALUES (38, '小思成长日记', 'other', '1536328080', '33', '3', 1, '3', 0, '6', '3333', '35', '管理员', '2018-09-07 21:48:10', 0, 0, 0, '10', '杭州京东', NULL);
COMMIT;

-- ----------------------------
-- Table structure for cPublicNumber
-- ----------------------------
DROP TABLE IF EXISTS `cPublicNumber`;
CREATE TABLE `cPublicNumber` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `dataId` varchar(45) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `topTitle` varchar(45) DEFAULT NULL,
  `topCost` varchar(45) DEFAULT NULL,
  `secondTitle` varchar(45) DEFAULT NULL,
  `secondCost` varchar(45) DEFAULT NULL,
  `lastTitle` varchar(45) DEFAULT NULL,
  `lastCost` varchar(45) DEFAULT NULL,
  `womenRatio` varchar(45) DEFAULT NULL,
  `updateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `planCount` int(11) DEFAULT '0',
  `updateRouter` varchar(45) DEFAULT '上传',
  `type` varchar(45) DEFAULT NULL,
  `brush` varchar(45) DEFAULT NULL,
  `inDetail` varchar(5000) DEFAULT NULL,
  `starImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPublicNumber
-- ----------------------------
BEGIN;
INSERT INTO `cPublicNumber` VALUES (32, '测试公众号', '3', 1, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '1', '2018-09-05 01:24:25', 2, '上传', '教育亲子', NULL, '2222\n这是投放详情', '/public/upload/1536081865163_my.png');
INSERT INTO `cPublicNumber` VALUES (33, '测试公众号', '3', 4, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '3', '2018-09-07 23:01:41', 0, '上传', '初高中', NULL, NULL, '/public/upload/1536330816232_favicon.png,/public/upload/1536330871704_favicon.png,/public/upload/1536332287213_favicon.png,/public/upload/1536332501647_favicon.png');
INSERT INTO `cPublicNumber` VALUES (34, '测试公众号的数据啊', '3', 7, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '9', '2018-08-20 14:38:50', 0, '上传', '时尚美妆', NULL, NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (35, '小思成长日记', 'Psy-diary', 280000, '28000', '25000', '15000', '10000', '/', '/', '60', '2018-09-07 21:48:10', 2, '上传', '教育亲子', '不刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (36, '暖暖妈爱分享啊', 'nnmafx', 1200000, '不接', '不接', '85000', '80000', '/', '/', '61', '2018-09-07 23:58:13', 0, '平台', '教育亲子', '不刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (37, '胖少女晚托班', 'babyfatlady_1987', 400000, '85000', '80000', '/', '/', '/', '/', '62', '2018-08-31 23:11:03', 0, '上传', '教育亲子', '不刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (38, '三个妈妈六个娃', 'pkumum', 200000, '35000', '30000', '/', '/', '/', '/', '63', '2018-08-31 23:11:03', 0, '上传', '教育亲子', '不刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (39, '中小学阅读吧', 'jiazhangbest', 350000, '15000', '12000', '/', '/', '/', '/', '66', '2018-08-31 23:11:03', 0, '上传', '教育亲子', '半刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (40, '花姐小食光', 'totyummy', 100000, '18000', '16,000', '/', '/', '/', '/', '64', '2018-08-31 23:11:03', 0, '上传', '教育亲子', '半刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (41, '家长家', 'jiazhanghome', 830000, '38000', '35000', NULL, '13000', '/', '/', '65', '2018-08-31 23:11:03', 0, '上传', '教育亲子', '半刷', NULL, NULL);
INSERT INTO `cPublicNumber` VALUES (42, '伊姐看电影', 'eemovie', 760000, '65000', '60000', '/', '32000', '/', '/', '68', '2018-09-17 22:38:58', 2, '平台', 'kol', '全刷', NULL, '/public/upload/1537195046137_psb (3).jpeg,/public/upload/1537195111700_16.jpeg');
COMMIT;

-- ----------------------------
-- Table structure for cUser
-- ----------------------------
DROP TABLE IF EXISTS `cUser`;
CREATE TABLE `cUser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `dept` varchar(45) DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `pwd` varchar(45) NOT NULL,
  `openId` varchar(45) NOT NULL,
  `isDeptAdmin` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cUser
-- ----------------------------
BEGIN;
INSERT INTO `cUser` VALUES (18, '管理员', '13857476603', 'sale', '技术总监', '', 'E10ADC3949BA59ABBE56E057F20F883E', '4B9783D59B714AA277712B0F44B4091D', 1);
INSERT INTO `cUser` VALUES (19, '测试财务权限', '18870420550', 'sale', '财务', '', 'E10ADC3949BA59ABBE56E057F20F883E', '949CEDE989C3445A39D7ADECB13C1CB6', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
