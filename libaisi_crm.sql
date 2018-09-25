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

 Date: 26/09/2018 02:30:06
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
INSERT INTO `cAuthor` VALUES (1, 'finance', '财务权限', '18');
INSERT INTO `cAuthor` VALUES (2, 'medium', '媒介权限', '22');
INSERT INTO `cAuthor` VALUES (3, 'sell', '销售权限', '20');
INSERT INTO `cAuthor` VALUES (4, 'charge', '主管权限', '21');
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPlan
-- ----------------------------
BEGIN;
INSERT INTO `cPlan` VALUES (39, '小思成长日记', 'top', '1537895402', '12', '1', 0, '3', 0, '6', '', '59', '管理员', '2018-09-26 01:10:14', 0, 0, 1, '9', '公司名称', NULL, NULL);
INSERT INTO `cPlan` VALUES (40, '小思成长日记', 'second', '1537895632', '1', '1', 1, '3', 0, '6', '1', '59', '管理员', '2018-09-26 01:14:00', 0, 0, 0, '10', '杭州京东', NULL, '18');
INSERT INTO `cPlan` VALUES (41, '暖暖妈爱分享', 'top', '1537898381', '2', '1', 1, '3', 0, '6', '222', '60', '销售主管测试', '2018-09-26 01:59:54', 0, 0, 0, '17', '测试公司名称', NULL, '21');
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
  `userId` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPublicNumber
-- ----------------------------
BEGIN;
INSERT INTO `cPublicNumber` VALUES (59, '小思成长日记', 'Psy-diary', 280000, '28000', '25000', '15000', '10000', '/', '/', '60', '2018-09-26 02:24:04', 2, '销售主管测试', '教育亲子', '不刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (60, '暖暖妈爱分享', 'nnmafx', 1200000, '不接', '不接', '85000', '80000', '/', '/', '61', '2018-09-26 01:59:54', 1, '管理员', '教育亲子', '不刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (61, '胖少女晚托班', 'babyfatlady_1987', 400000, '85000', '80000', '/', '/', '/', '/', '62', '2018-09-26 01:09:06', 0, '管理员', '教育亲子', '不刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (62, '三个妈妈六个娃', 'pkumum', 200000, '35000', '30000', '/', '/', '/', '/', '63', '2018-09-26 01:09:06', 0, '管理员', '教育亲子', '不刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (63, '花姐小食光', 'totyummy', 100000, '18000', '16,000', '/', '/', '/', '/', '64', '2018-09-26 01:09:06', 0, '管理员', '教育亲子', '半刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (64, '家长家', 'jiazhanghome', 830000, '38000', '35000', NULL, '13000', '/', '/', '65', '2018-09-26 01:09:06', 0, '管理员', '教育亲子', '半刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (65, '中小学阅读吧', 'jiazhangbest', 350000, '15000', '12000', '/', '/', '/', '/', '66', '2018-09-26 01:09:06', 0, '管理员', '教育亲子', '半刷', NULL, NULL, '18');
INSERT INTO `cPublicNumber` VALUES (66, '伊姐看电影', 'eemovie', 760000, '65000', '60000', '/', '32000', '/', '/', '68', '2018-09-26 01:09:06', 0, '管理员', 'kol', '全刷', NULL, NULL, '18');
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cUser
-- ----------------------------
BEGIN;
INSERT INTO `cUser` VALUES (18, '管理员', '13857476603', 'master', '技术总监', '', 'E10ADC3949BA59ABBE56E057F20F883E', '4B9783D59B714AA277712B0F44B4091D', 1);
INSERT INTO `cUser` VALUES (19, '测试财务权限', '18870420550', 'sale', '财务', '', 'E10ADC3949BA59ABBE56E057F20F883E', '949CEDE989C3445A39D7ADECB13C1CB6', 0);
INSERT INTO `cUser` VALUES (20, '测试销售权限', '18870420551', 'sale', '销售员', '', 'E10ADC3949BA59ABBE56E057F20F883E', '9BF9AB468B41370F84A4862BE0F6E56E', 0);
INSERT INTO `cUser` VALUES (21, '销售主管测试', '13857476602', 'sale', '销售主管', '', 'E10ADC3949BA59ABBE56E057F20F883E', '2F5B661B34545A37596DD9FB01D2F317', 0);
INSERT INTO `cUser` VALUES (22, '媒介测试', '13857476601', 'media', '媒介', '媒介测试', 'E10ADC3949BA59ABBE56E057F20F883E', '91874FE87871990E9113629826CC2AFA', 0);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
