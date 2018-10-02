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

 Date: 02/10/2018 12:06:39
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cAuthor
-- ----------------------------
BEGIN;
INSERT INTO `cAuthor` VALUES (1, 'finance', '财务权限', '19');
INSERT INTO `cAuthor` VALUES (2, 'medium', '媒介权限', '22');
INSERT INTO `cAuthor` VALUES (3, 'sell', '销售权限', '20');
INSERT INTO `cAuthor` VALUES (4, 'charge', '主管权限', '21');
INSERT INTO `cAuthor` VALUES (5, 'master', '创始人权限', '18');
INSERT INTO `cAuthor` VALUES (6, 'chargeMedium', '媒介主管权限', '23');
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
  `userid` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cCustomer
-- ----------------------------
BEGIN;
INSERT INTO `cCustomer` VALUES (17, '测试公司名称', '京东', '老王', '13857476603', '1', '1', 0, '管理员', 0, NULL, NULL, 0, '18');
INSERT INTO `cCustomer` VALUES (18, '销售下的数据', '销售下的数据', '销售下的数据', '销售下的数据', '销售下的数据', '销售下的数据', 0, '测试销售权限', 0, NULL, NULL, 0, '20');
INSERT INTO `cCustomer` VALUES (19, '管理员录入的客户', '管理员录入的客户', '管理员录入的客户', '管理员录入的客户', '管理员录入的客户', '管理员录入的客户', 0, '管理员', 0, NULL, NULL, 0, '18');
INSERT INTO `cCustomer` VALUES (20, '销售主管录入数据', '销售主管录入数据', '销售主管录入数据', '销售主管录入数据', '销售主管录入数据', '销售主管录入数据', 0, '销售主管测试', 0, NULL, NULL, 0, '21');
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
  `userId` varchar(50) DEFAULT NULL,
  `impost` decimal(10,3) DEFAULT NULL,
  `channelImpost` decimal(10,3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPlan
-- ----------------------------
BEGIN;
INSERT INTO `cPlan` VALUES (39, '小思成长日记', 'top', '1537895402', '12', '1', 0, '3', 0, '6', '', '59', '管理员', '2018-09-26 01:10:14', 0, 0, 1, '9', '公司名称', NULL, NULL, NULL, NULL);
INSERT INTO `cPlan` VALUES (40, '小思成长日记', 'second', '1537895632', '1', '1', 1, '3', 0, '6', '1', '59', '管理员', '2018-09-26 01:14:00', 0, 0, 1, '10', '杭州京东', NULL, '18', NULL, NULL);
INSERT INTO `cPlan` VALUES (41, '暖暖妈爱分享', 'top', '1537898381', '2', '1', 1, '3', 0, '6', '222', '60', '管理员', '2018-09-26 01:59:54', 0, 0, 1, '17', '测试公司名称', NULL, '18', NULL, NULL);
INSERT INTO `cPlan` VALUES (42, '暖暖妈爱分享', 'top', '1537898381', '2', '1', 1, '3', 0, '6', '222', NULL, '管理员', '2018-10-01 14:38:41', 0, 0, 1, NULL, NULL, NULL, '18', NULL, NULL);
INSERT INTO `cPlan` VALUES (43, '暖暖妈爱分享', 'top', '1537898381', '2', '1', 1, '3', 0, '6', '222', NULL, '管理员', '2018-10-01 14:46:28', 0, 0, 1, NULL, NULL, NULL, '18', NULL, NULL);
INSERT INTO `cPlan` VALUES (44, '暖暖妈爱分享', 'top', '1537898381', '2', '1', 1, '3', 0, '6', '222', NULL, '管理员', '2018-10-01 14:58:46', 0, 0, 1, NULL, NULL, NULL, '18', NULL, NULL);
INSERT INTO `cPlan` VALUES (45, '小思成长日记', 'top', '1538390305', '34', '324', 1, '3', 1, '6', '你好', '59', '管理员', '2018-10-01 18:39:32', 0, 0, 1, '18', '销售下的数据', NULL, '18', 1.000, 9.000);
INSERT INTO `cPlan` VALUES (46, '小思成长日记', 'second', '1538390464', '34', '23', 0, '3', 0, '6', '', '59', '管理员', '2018-10-01 18:41:16', 0, 0, 1, '18', '销售下的数据', NULL, '18', 1.000, 1.000);
INSERT INTO `cPlan` VALUES (47, '小思成长日记', 'top', '1538390514', '12', '2', 0, '3', 0, '6', '', '59', '管理员', '2018-10-01 18:42:10', 0, 0, 1, '17', '测试公司名称', NULL, '18', 0.000, 0.000);
INSERT INTO `cPlan` VALUES (48, '小思成长日记', 'top', '1539772979', '4', '3', 0, '3', 0, '6', '', '59', '管理员', '2018-10-01 18:43:11', 0, 0, 1, '18', '销售下的数据', NULL, '18', 0.000, 0.000);
INSERT INTO `cPlan` VALUES (49, '小思成长日记', 'second', '1539773183', '34', '23', 0, '3', 0, '6', '', '59', '管理员', '2018-10-01 18:46:39', 0, 0, 1, '17', '测试公司名称', NULL, '18', 1.000, 1.000);
INSERT INTO `cPlan` VALUES (50, '小思成长日记', 'other', '1540464498', '455', '3223', 0, '3', 0, '6', '2323', '59', '管理员', '2018-10-01 18:48:31', 0, 0, 1, '18', '销售下的数据', NULL, '18', 13.000, 94.000);
INSERT INTO `cPlan` VALUES (51, '小思成长日记', 'second', '1539773369', '45', '3', 1, '3', 1, '6', '44', '59', '管理员', '2018-10-01 18:49:38', 0, 0, 1, '18', '销售下的数据', '财务备注\n擦', '18', 1.000, 0.000);
INSERT INTO `cPlan` VALUES (52, '小思成长日记', 'top', '1539773488', '459', '32', 1, '3', 0, '6', '', '59', '管理员', '2018-10-01 18:51:39', 0, 0, 1, '18', '销售下的数据', NULL, '18', 13.370, 0.932);
INSERT INTO `cPlan` VALUES (53, '暖暖妈爱分享', 'second', '1538407116', '455', '23', 0, '3', 0, '6', ' 销售的排期修改', '60', '测试销售权限', '2018-10-01 23:18:50', 0, 0, 1, '17', '测试公司名称', NULL, '20', 13.252, 0.670);
INSERT INTO `cPlan` VALUES (54, '花姐小食光', 'top', '', '45', '34', 1, '3', 0, '6', '', '71', '测试销售权限', '2018-10-01 23:53:08', 0, 0, 1, '17', '测试公司名称', NULL, '20', 1.311, 0.990);
INSERT INTO `cPlan` VALUES (55, '小思成长日记', 'top', '1538409428', '45', '34', 1, '3', 0, '6', '3', '67', '测试销售权限', '2018-10-01 23:57:18', 0, 0, 0, '17', '测试公司名称', NULL, '20', 1.311, 0.990);
INSERT INTO `cPlan` VALUES (56, '花姐小食光', 'second', '1538409481', '3', '2', 1, '6', 0, '3', '', '71', '销售主管测试', '2018-10-01 23:58:10', 0, 0, 0, '18', '销售下的数据', NULL, '21', 0.087, 0.058);
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
  `planCount` int(11) DEFAULT '0',
  `updateRouter` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `brush` varchar(45) DEFAULT NULL,
  `inDetail` varchar(5000) DEFAULT NULL,
  `starImage` varchar(255) DEFAULT NULL,
  `userId` varchar(50) DEFAULT NULL,
  `updateTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPublicNumber
-- ----------------------------
BEGIN;
INSERT INTO `cPublicNumber` VALUES (67, '小思成长日记', 'Psy-diarys', 280000, '28000', '25000', '15000', '10000', '/', '/', '60', 1, '媒介测试', '教育亲子', '不刷', NULL, NULL, '18', NULL);
INSERT INTO `cPublicNumber` VALUES (68, '暖暖妈爱分享', 'nnmafx', 1200000, '不接', '不接', '85000', '80000', '/', '/', '61', 0, '媒介测试', '教育亲子', '不刷', NULL, NULL, '19', NULL);
INSERT INTO `cPublicNumber` VALUES (69, '胖少女晚托班', 'babyfatlady_1987', 400000, '85000', '80000', '/', '/', '/', '/', '62', 0, '媒介测试', '教育亲子', '不刷', NULL, NULL, '20', NULL);
INSERT INTO `cPublicNumber` VALUES (70, '三个妈妈六个娃', 'pkumum', 200000, '35000', '30000', '/', '/', '/', '/', '63', 0, '媒介测试', '教育亲子', '不刷', NULL, NULL, '21', NULL);
INSERT INTO `cPublicNumber` VALUES (71, '花姐小食光', 'totyummy', 100000, '18000', '16,000', '/', '/', '/', '/', '64', 2, '媒介测试', '教育亲子', '半刷', NULL, NULL, '22', NULL);
INSERT INTO `cPublicNumber` VALUES (72, '家长家', 'jiazhanghome', 830000, '38000', '35000', NULL, '13000', '/', '/', '65', 0, '媒介测试', '教育亲子', '半刷', NULL, NULL, '22', NULL);
INSERT INTO `cPublicNumber` VALUES (73, '中小学阅读吧', 'jiazhangbest', 350000, '15000', '12000', '/', '/', '/', '/', '66', 0, '媒介测试', '教育亲子', '半刷', NULL, NULL, '22', NULL);
INSERT INTO `cPublicNumber` VALUES (74, '伊姐看电影', 'eemovie', 760000, '65000', '60000', '/', '32000', '/', '/', '68', 0, '媒介测试', 'kol', '全刷', NULL, NULL, '22', NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cUser
-- ----------------------------
BEGIN;
INSERT INTO `cUser` VALUES (18, '管理员', '13857476603', 'master', '技术总监', '', 'E10ADC3949BA59ABBE56E057F20F883E', '76BFF45ACAC84E978955B499FC303E25', 1);
INSERT INTO `cUser` VALUES (19, '测试财务权限', '18870420550', 'sale', '财务', '', 'E10ADC3949BA59ABBE56E057F20F883E', '949CEDE989C3445A39D7ADECB13C1CB6', 0);
INSERT INTO `cUser` VALUES (20, '测试销售权限', '18870420551', 'sale', '销售员', '', 'E10ADC3949BA59ABBE56E057F20F883E', '9BF9AB468B41370F84A4862BE0F6E56E', 0);
INSERT INTO `cUser` VALUES (21, '销售主管测试', '13857476602', 'sale', '销售主管', '', 'E10ADC3949BA59ABBE56E057F20F883E', '2F5B661B34545A37596DD9FB01D2F317', 0);
INSERT INTO `cUser` VALUES (22, '媒介测试', '13857476601', 'media', '媒介', '媒介测试', 'E10ADC3949BA59ABBE56E057F20F883E', '91874FE87871990E9113629826CC2AFA', 0);
INSERT INTO `cUser` VALUES (23, '媒介主管权限测试', '13867476603', 'media', '主管', '', 'E10ADC3949BA59ABBE56E057F20F883E', 'A95EBE8FC413AE887A6EE354DFF9CD18', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
