ALTER TABLE cPublicNumber ADD COLUMN model int NOT NULL DEFAULT '0' COMMENT '0 为公众号 1 为直播 2 为微博';
ALTER TABLE cPublicNumber ADD COLUMN platform varchar(255) NOT NULL;
ALTER TABLE cPlan ADD COLUMN medium varchar(100) NOT NULL;
ALTER TABLE cPlan ADD COLUMN model int NOT NULL DEFAULT '0' COMMENT '0 为公众号 1 为直播 2 为微博';
ALTER TABLE cPlan MODIFY medium varchar(100) NULL;