const Koa = require("koa");
const app = new Koa();
const debug = require("debug")("crm-server");
const path = require("path");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const schedule = require("node-schedule");

const response = require("./middlewares/response");
const config = require("./config");
const mysql = require("./utils/mysql");

app.use(
  cors({
    origin: function (ctx) {
      return "*";
    },
  })
);

// 使用响应处理中间件
app.use(response);

// 解析请求体
app.use(bodyParser());

// 引入路由分发
const router = require("./routes");
app.use(router.routes());

// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`));

// 定时任务
const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

// 启动任务
const job = schedule.scheduleJob(rule, async () => {
  let res = await mysql("cCustomer")
    .update({
      isDelete: 1,
    })
    .where(function () {
      this.where("isCollaborate", 0).where("isDelete", 0);
      const date = new Date();
      date.setDate(date.getDate() - 30);
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      const time = `${year}-${month}-${day}`;
      this.where("createTime", "<=", time);
    });
  console.log("res", res);
});
