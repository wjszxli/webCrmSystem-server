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

 Date: 20/08/2018 14:58:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cCustomer
-- ----------------------------
BEGIN;
INSERT INTO `cCustomer` VALUES (9, '公司名称', '客户品牌', '联系人', '电话', '微信', 'qq', 1, '跟进人', 0);
INSERT INTO `cCustomer` VALUES (10, '杭州京东', '京东', '何家豪', '18870420552', '', '', 0, '', 0);
INSERT INTO `cCustomer` VALUES (11, '娃哈哈', '水果', '联系我', '1', '1', '1', 1, '1', 0);
INSERT INTO `cCustomer` VALUES (12, '测试合作', '品牌', '你好', '333', '33', '333', 0, '333', 1);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPlan
-- ----------------------------
BEGIN;
INSERT INTO `cPlan` VALUES (1, '333', 'top', '1534689459', '33', '33', 1, '3', 0, '6', '3333', NULL, NULL, '2018-08-20 00:06:46', 1, 1, 0);
INSERT INTO `cPlan` VALUES (2, 'rrr', 'second', '1534690608', '23', '2', 1, '3', 0, '6', '2222', '32', NULL, '2018-08-20 00:06:46', 1, 1, 0);
INSERT INTO `cPlan` VALUES (3, '公众号', 'second', '1534693436', '23', '12', 1, '3', 0, '6', '输入', '34', '管理员', '2018-08-20 00:06:46', 1, 1, 1);
INSERT INTO `cPlan` VALUES (4, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', '32', '管理员', '2018-08-20 00:13:20', 0, 0, 0);
INSERT INTO `cPlan` VALUES (5, '开始公众号', 'top', '1534696410', '233', '1', 1, '3', 0, '6', '2', '32', '管理员', '2018-08-20 00:33:42', 0, 0, 0);
INSERT INTO `cPlan` VALUES (6, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', NULL, '管理员', '2018-08-20 01:05:00', 0, 0, 0);
INSERT INTO `cPlan` VALUES (7, '测试的', 'second', '1534695181', '100', '2', 1, '3', 0, '6', '', NULL, '管理员', '2018-08-20 01:05:23', 0, 0, 0);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cPublicNumber
-- ----------------------------
BEGIN;
INSERT INTO `cPublicNumber` VALUES (32, '测试公众号', '3', 1, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '1', '2018-08-20 14:38:44', 0, '上传', '教育亲子');
INSERT INTO `cPublicNumber` VALUES (33, '测试公众号', '3', 4, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '3', '2018-08-20 14:38:48', 0, '上传', '初高中');
INSERT INTO `cPublicNumber` VALUES (34, '测试公众号的数据啊', '3', 7, '头条刊例', '头条成本', '次条刊例更新', '次条成本', '末条刊例更新', '末条成本', '9', '2018-08-20 14:38:50', 0, '上传', '时尚美妆');
COMMIT;

-- ----------------------------
-- Table structure for cUser
-- ----------------------------
DROP TABLE IF EXISTS `cUser`;
CREATE TABLE `cUser` (
  `idcUser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) NOT NULL,
  `dept` varchar(45) DEFAULT NULL,
  `job` varchar(45) DEFAULT NULL,
  `remark` varchar(45) DEFAULT NULL,
  `pwd` varchar(45) NOT NULL,
  `openId` varchar(45) NOT NULL,
  PRIMARY KEY (`idcUser`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of cUser
-- ----------------------------
BEGIN;
INSERT INTO `cUser` VALUES (18, '管理员', '13857476603', '研发部', '技术总监', '', 'E10ADC3949BA59ABBE56E057F20F883E', '4B9783D59B714AA277712B0F44B4091D');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
