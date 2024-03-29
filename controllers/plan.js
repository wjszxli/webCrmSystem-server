const mysql = require("../utils/mysql");
const math = require("mathjs");

const { response } = require("../utils/util");

const handleTime = (val) => {
  let dateTime = new Date(val);
  dateTime = dateTime.setDate(dateTime.getDate() + 1);
  dateTime = new Date(dateTime);
  return `${dateTime.getFullYear()}-${
    dateTime.getMonth() + 1
  }-${dateTime.getDate()}`;
};

module.exports.savePlan = async (ctx, next) => {
  try {
    let {
      publicNumber,
      location,
      inTime,
      price,
      cost,
      isInvoiceClient,
      taxClient,
      isInvoiceRouter,
      taxRouter,
      remark,
      publicNumberId,
      planPeople,
      customer,
      customerName,
      userId,
      impost,
      channelImpost,
      rebate,
      model,
      medium,
    } = ctx.request.body;

    await mysql("cPlan").insert({
      publicnumber: publicNumber,
      location,
      intime: inTime,
      price,
      cost,
      customer,
      isinvoiceclient: isInvoiceClient,
      taxclient: taxClient,
      isinvoicerouter: isInvoiceRouter,
      taxrouter: taxRouter,
      remark,
      publicnumberid: publicNumberId,
      planpeople: planPeople,
      customername: customerName,
      userid: userId,
      impost,
      channelimpost: channelImpost,
      rebate,
      model,
      medium,
    });

    if (publicNumberId) {
      const res = await mysql("cPublicNumber").where({
        id: publicNumberId,
      });
      if (res.length) {
        await mysql("cPublicNumber")
          .update({
            plancount: res[0].planCount + 1,
          })
          .where({
            id: publicNumberId,
          });
      }
    }
    ctx.state.data = {
      tip: "保存成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getPlan = async (ctx, next) => {
  try {
    const {
      pageIndex,
      pageSize,
      isDelete,
      publicNumber,
      planPeople,
      isBack,
      isPay,
      remark,
      startTime,
      endTime,
      tag,
      userId,
      financeReamrk,
      inTimeStartTime,
      inTimeEndTime,
      backTimeStartTime,
      backTimeEndTime,
      order,
      model,
      medium,
    } = ctx.request.query;

    const searchData = {};

    const searchOrder = order ? order : "createTime";

    if (isDelete) {
      searchData.isDelete = isDelete;
    }
    if (planPeople) {
      const data = await mysql("cUser").where({
        id: planPeople,
      });
      if (data.length) {
        searchData.planPeople = data[0].name;
      }
    }
    if (isBack) {
      searchData.isBack = isBack;
    }
    if (isPay) {
      searchData.isPay = isPay;
    }
    if (model) {
      searchData.model = model;
    }
    if (medium) {
      searchData.medium = medium;
    }
    let res = [];
    res = await mysql("cPlan")
      .limit(pageSize)
      .offset((pageIndex - 1) * pageSize)
      .where(searchData)
      .where(function () {
        if (publicNumber) {
          this.where("id", publicNumber)
            .orWhere("publicNumber", "like", `%${publicNumber}%`)
            .orWhere("customerName", "like", `%${publicNumber}%`);
        }
      })
      .where(function () {
        if (remark) {
          this.where("remark", "like", `%${remark}%`);
        }
        if (financeReamrk) {
          this.where("financeReamrk", "like", `%${financeReamrk}%`);
        }
        if (startTime) {
          this.where("createTime", ">=", startTime);
        }
        if (endTime) {
          this.where("createTime", "<", handleTime(endTime));
        }
        if (inTimeStartTime) {
          let startTime = `${new Date(inTimeStartTime).getTime() - 28800000}`;
          startTime = startTime.substr(0, startTime.length - 3);
          this.where("inTime", ">=", startTime);
        }
        if (inTimeEndTime) {
          let endTime = `${new Date(inTimeEndTime).getTime() + 57599000}`;
          endTime = endTime.substr(0, endTime.length - 3);
          this.where("inTime", "<=", Number(endTime));
        }
        if (backTimeStartTime) {
          const startTime = new Date(backTimeStartTime).getTime() - 28800000;
          this.where("backTime", ">=", startTime);
        }
        if (backTimeEndTime) {
          const endTime = new Date(backTimeEndTime).getTime() + 57599000;
          this.where("backTime", "<=", endTime);
        }
        if (tag !== "all") {
          if (tag === "dept") {
            this.whereIn("userid", function () {
              this.select("id")
                .from("cUser")
                .whereIn("dept", function () {
                  this.select("dept").from("cUser").where({
                    id: userId,
                  });
                });
            });
          } else if (tag === "medium") {
            this.where("medium", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          } else if (tag === "self") {
            this.where("planPeople", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          }
        }
      })
      .orderBy(searchOrder, "desc");

    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getPlanAll = async (ctx, next) => {
  try {
    const res = await mysql("cPlan");
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getPlanAllSum = async (ctx, next) => {
  const {
    isDelete,
    publicNumber,
    planPeople,
    isBack,
    isPay,
    remark,
    startTime,
    endTime,
    tag,
    userId,
    financeReamrk,
    inTimeStartTime,
    inTimeEndTime,
    backTimeStartTime,
    backTimeEndTime,
    model,
    medium,
  } = ctx.request.query;

  const searchData = {};

  if (isDelete) {
    searchData.isDelete = isDelete;
  }
  if (planPeople) {
    const data = await mysql("cUser").where({
      id: planPeople,
    });
    if (data.length) {
      searchData.planPeople = data[0].name;
    }
  }
  if (isBack) {
    searchData.isBack = isBack;
  }
  if (isPay) {
    searchData.isPay = isPay;
  }

  if (model) {
    searchData.model = model;
  }
  if (medium) {
    searchData.medium = medium;
  }

  try {
    const res = await mysql("cPlan")
      .sum("price")
      .sum("cost")
      .sum("impost")
      .sum("channelImpost")
      .sum("rebate")
      .where(searchData)
      .where(function () {
        if (publicNumber) {
          this.where("id", publicNumber)
            .orWhere("publicNumber", "like", `%${publicNumber}%`)
            .orWhere("customerName", "like", `%${publicNumber}%`);
        }
      })
      .where(function () {
        if (remark) {
          this.where("remark", "like", `%${remark}%`);
        }
        if (financeReamrk) {
          this.where("financeReamrk", "like", `%${financeReamrk}%`);
        }
        if (startTime) {
          this.where("createTime", ">=", startTime);
        }
        if (endTime) {
          this.where("createTime", "<=", handleTime(endTime));
        }
        if (inTimeStartTime) {
          let startTime = `${new Date(inTimeStartTime).getTime() - 28800000}`;
          startTime = startTime.substr(0, startTime.length - 3);
          this.where("inTime", ">=", startTime);
        }
        if (inTimeEndTime) {
          let endTime = `${new Date(inTimeEndTime).getTime() + 57599000}`;
          endTime = endTime.substr(0, endTime.length - 3);
          this.where("inTime", "<=", Number(endTime));
        }
        if (backTimeStartTime) {
          const startTime = new Date(backTimeStartTime).getTime() - 28800000;
          this.where("backTime", ">=", startTime);
        }
        if (backTimeEndTime) {
          const endTime = new Date(backTimeEndTime).getTime() + 57599000;
          this.where("backTime", "<=", endTime);
        }
        if (tag !== "all") {
          if (tag === "dept") {
            this.whereIn("userid", function () {
              this.select("id")
                .from("cUser")
                .whereIn("dept", function () {
                  this.select("dept").from("cUser").where({
                    id: userId,
                  });
                });
            });
          } else if (tag === "medium") {
            this.where("medium", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          } else if (tag === "self") {
            this.where("planPeople", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          }
        }
      });
    // Math.floor(15.7784514000 * 100) / 100
    const price = Math.floor(res[0]["sum(`price`)"] * 100) / 100;
    const cost = Math.floor(res[0]["sum(`cost`)"] * 100) / 100;
    const impost = Math.floor(res[0]["sum(`impost`)"] * 100) / 100;
    const channelImpost =
      Math.floor(res[0]["sum(`channelImpost`)"] * 100) / 100;
    const rebate = Math.floor(res[0]["sum(`rebate`)"] * 100) / 100;
    const profit =
      Math.floor(
        math
          .chain(price)
          .subtract(cost)
          .subtract(impost)
          .add(channelImpost)
          .subtract(rebate).value * 100
      ) / 100;
    ctx.state.data = {
      price,
      cost,
      impost,
      channelImpost,
      rebate,
      profit,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getPlanCount = async (ctx, next) => {
  try {
    const {
      isDelete,
      publicNumber,
      planPeople,
      isBack,
      isPay,
      remark,
      startTime,
      endTime,
      tag,
      userId,
      financeReamrk,
      inTimeStartTime,
      inTimeEndTime,
      backTimeStartTime,
      backTimeEndTime,
      model,
      medium,
    } = ctx.request.query;

    const searchData = {};

    if (isDelete) {
      searchData.isDelete = isDelete;
    }
    if (planPeople) {
      const data = await mysql("cUser").where({
        id: planPeople,
      });
      if (data.length) {
        searchData.planPeople = data[0].name;
      }
    }
    if (isBack) {
      searchData.isBack = isBack;
    }
    if (isPay) {
      searchData.isPay = isPay;
    }
    if (model) {
      searchData.model = model;
    }

    if (medium) {
      searchData.medium = medium;
    }

    let res = [
      {
        count: 0,
      },
    ];
    res = await mysql("cPlan")
      .count("id as count")
      .where(searchData)
      .where(function () {
        if (publicNumber) {
          this.where("id", publicNumber)
            .orWhere("publicNumber", "like", `%${publicNumber}%`)
            .orWhere("customerName", "like", `%${publicNumber}%`);
        }
      })
      .where(function () {
        if (remark) {
          this.where("remark", "like", `%${remark}%`);
        }
        if (startTime) {
          this.where("createTime", ">=", startTime);
        }
        if (endTime) {
          this.where("createTime", "<=", handleTime(endTime));
        }
        if (financeReamrk) {
          this.where("financeReamrk", "like", `%${financeReamrk}%`);
        }
        if (inTimeStartTime) {
          let startTime = `${new Date(inTimeStartTime).getTime() - 28800000}`;
          startTime = startTime.substr(0, startTime.length - 3);
          this.where("inTime", ">=", startTime);
        }
        if (inTimeEndTime) {
          let endTime = `${new Date(inTimeEndTime).getTime() + 57599000}`;
          endTime = endTime.substr(0, endTime.length - 3);
          this.where("inTime", "<=", Number(endTime));
        }
        if (backTimeStartTime) {
          const startTime = new Date(backTimeStartTime).getTime() - 28800000;
          this.where("backTime", ">=", startTime);
        }
        if (backTimeEndTime) {
          const endTime = new Date(backTimeEndTime).getTime() + 57599000;
          this.where("backTime", "<=", endTime);
        }
        if (tag !== "all") {
          if (tag === "dept") {
            this.whereIn("userid", function () {
              this.select("id")
                .from("cUser")
                .whereIn("dept", function () {
                  this.select("dept").from("cUser").where({
                    id: userId,
                  });
                });
            });
          } else if (tag === "medium") {
            this.where("medium", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          } else if (tag === "self") {
            this.where("planPeople", function () {
              this.select("name").from("cUser").where({
                id: userId,
              });
            });
          }
        }
      });
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deletePlan = async (ctx, next) => {
  try {
    const { ids, isDelete } = ctx.request.body;
    if (ids.length > 0) {
      res = await mysql("cPlan")
        .update({
          isDelete,
        })
        .whereIn("id", ids);
    }
    const tip = "删除成功";
    ctx.state.data = {
      tip,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updatePlanBack = async (ctx, next) => {
  try {
    let { ids, type, backTime } = ctx.request.body;

    backTime = new Date(backTime).getTime();

    if (type === 1) {
      type = 0;
      backTime = "";
    } else if (type === 0) {
      type = 1;
    }

    if (ids.length > 0) {
      res = await mysql("cPlan")
        .update({
          isBack: type,
          backTime,
        })
        .whereIn("id", ids);
    }
    const tip = "操作成功";
    ctx.state.data = {
      tip,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updatePlanPay = async (ctx, next) => {
  try {
    let { ids, type } = ctx.request.body;

    if (type === 1) {
      type = 0;
    } else if (type === 0) {
      type = 1;
    }

    if (ids.length > 0) {
      res = await mysql("cPlan")
        .update({
          isPay: type,
        })
        .whereIn("id", ids);
    }
    const tip = "操作成功";
    ctx.state.data = {
      tip,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getOneCustomer = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    res = await mysql("cCustomer").where({
      id,
    });
    ctx.state.data = res;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

module.exports.getOnePlan = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;

    const res = await mysql("cPlan").where({
      id,
    });
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.addFinance = async (ctx, next) => {
  try {
    const { id, financeReamrk } = ctx.request.body;

    const res = await mysql("cPlan")
      .update({
        financereamrk: financeReamrk,
      })
      .where({
        id,
      });
    ctx.state.data = {
      tip: "添加财务备注成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updatePlan = async (ctx, next) => {
  try {
    const {
      publicNumber,
      location,
      inTime,
      price,
      cost,
      isInvoiceClient,
      taxClient,
      isInvoiceRouter,
      taxRouter,
      remark,
      publicNumberId,
      planPeople,
      customer,
      customerName,
      userId,
      id,
      impost,
      channelImpost,
      rebate,
      medium,
    } = ctx.request.body;
    if (id) {
      await mysql("cPlan")
        .update({
          publicnumber: publicNumber,
          location,
          intime: inTime,
          price,
          cost,
          customer,
          isinvoiceclient: isInvoiceClient,
          taxclient: taxClient,
          isinvoicerouter: isInvoiceRouter,
          taxrouter: taxRouter,
          remark,
          publicnumberid: publicNumberId,
          planpeople: planPeople,
          customername: customerName,
          userid: userId,
          impost,
          channelimpost: channelImpost,
          rebate,
          medium,
        })
        .where({
          id,
        });
    }
    ctx.state.data = {
      tip: "保存成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};
