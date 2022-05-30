const mysql = require("../utils/mysql");
const { isLogin } = require("../utils/util");

/**
 * model 值为 4
 */

module.exports.saveCamera = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const {
      name,
      dataId,
      star,
      topTitle,
      topCost,
      secondTitle,
      secondCost,
      lastTitle,
      lastCost,
      womenRatio,
      operation,
      brush,
      type,
      updateRouter,
      userId,
      remark,
      newTime,
      platform,
    } = ctx.request.body;
    console.log("operation", operation);
    if (operation === "add") {
      let res = [];
      if (dataId) {
        res = await mysql("cPublicNumber").where({
          dataid: dataId,
          model: 4,
        });
      }
      const updateTime = new Date();
      if (res.length === 0 || !dataId) {
        const data = {
          name,
          dataid: dataId,
          star,
          toptitle: topTitle,
          topcost: topCost,
          secondtitle: secondTitle,
          secondcost: secondCost,
          lasttitle: lastTitle,
          lastcost: lastCost,
          womenratio: 0,
          updaterouter: updateRouter,
          userid: userId,
          updatetime: updateTime,
          type,
          brush,
          remark,
          platform,
        };
        if (newTime) {
          data.newTime = newTime;
        }
        data.model = 4;
        await mysql("cPublicNumber").insert(data);
      }
    } else if (operation === "update") {
      const data = {
        name,
        star,
        toptitle: topTitle,
        topcost: topCost,
        secondtitle: secondTitle,
        secondcost: secondCost,
        lasttitle: lastTitle,
        lastcost: lastCost,
        womenratio: womenRatio,
        updaterouter: updateRouter,
        userid: userId,
        brush,
        type,
        remark,
      };
      if (newTime) {
        data.newTime = newTime;
      }
      await mysql("cPublicNumber").update(data).where({
        dataid: dataId,
        model: 4,
      });
    }
    ctx.state.data = {
      tip: "保存成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getCamera = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const {
      pageIndex,
      pageSize,
      publicNumber,
      type,
      starS,
      starE,
      brush,
      womenRatioS,
      womenRatioE,
      tag,
      userId,
      priceS,
      priceE,
      order,
      updateRouter,
      remark,
      platform,
    } = ctx.request.query;
    const searchData = { model: 4 };
    const searchOrder = order ? order : "updateTime";

    if (type) {
      searchData.type = type;
    }
    let res = [];
    res = await mysql("cPublicNumber")
      .limit(pageSize)
      .offset((pageIndex - 1) * pageSize)
      .where(searchData)
      .where(function () {
        if (publicNumber) {
          this.where("name", "like", `%${publicNumber}%`).orWhere(
            "dataId",
            "=",
            publicNumber
          );
        }
        if (remark) {
          this.where("remark", "like", `%${remark}%`);
        }
        if (updateRouter) {
          this.where("updateRouter", "=", updateRouter);
        }
        if (starS) {
          this.where("star", ">", starS);
        }
        if (starE) {
          this.where("star", "<", starE);
        }
        if (womenRatioS) {
          this.where("womenRatio", ">", womenRatioS);
        }
        if (womenRatioE) {
          this.where("womenRatio", "<", womenRatioE);
        }
        if (priceS) {
          this.where("topCost", ">", Number(priceS));
        }
        if (priceE) {
          this.where("topCost", "<", Number(priceE));
        }
        if (brush) {
          this.where("brush", "=", brush);
        }
        if (platform) {
          this.where("platform", "=", platform);
        }
        console.log("tag", tag);
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
          }
          this.where("userid", "=", userId);
        }
      })
      .orderBy(searchOrder, "desc");
    console.log("searchOrder", searchOrder);
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getCameraCount = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const {
      publicNumber,
      type,
      starS,
      starE,
      womenRatioS,
      womenRatioE,
      tag,
      userId,
      priceS,
      priceE,
      remark,
      updateRouter,
      platform,
    } = ctx.request.query;
    const searchData = { model: 4 };

    if (type) {
      searchData.type = type;
    }
    let res = [
      {
        count: 0,
      },
    ];
    res = await mysql("cPublicNumber")
      .count("id as count")
      .where(searchData)
      .where(function () {
        if (publicNumber) {
          this.where("name", "like", `%${publicNumber}%`);
        }
        if (remark) {
          this.where("remark", "like", `%${remark}%`);
        }
        if (updateRouter) {
          this.where("updateRouter", "=", updateRouter);
        }
        if (starS) {
          this.where("star", ">", starS);
        }
        if (starE) {
          this.where("star", "<", starE);
        }
        if (womenRatioS) {
          this.where("womenRatio", ">", womenRatioS);
        }
        if (womenRatioE) {
          this.where("womenRatio", "<", womenRatioE);
        }
        if (priceS) {
          this.where("topCost", ">", Number(priceS));
        }
        if (priceE) {
          this.where("topCost", "<", Number(priceE));
        }
        if (platform) {
          this.where("platform", "=", platform);
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
          }
          this.where("userid", "=", userId);
        }
      });
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.deleteCamera = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const { id } = ctx.request.query;
    console.log("id", id);
    const res = await mysql("cPublicNumber")
      .where({
        id,
      })
      .del();
    const tip = "删除成功";
    ctx.state.data = {
      tip,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

module.exports.getOneCamera = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const { id } = ctx.request.query;
    res = await mysql("cPublicNumber").where({
      id,
    });
    ctx.state.data = res;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

module.exports.addInDetail = async (ctx, next) => {
  try {
    const { id, inDetail } = ctx.request.body;

    await mysql("cPublicNumber")
      .update({
        indetail: inDetail,
      })
      .where({
        id,
      });
    ctx.state.data = {
      tip: "添加投入详情成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateCamera = async (ctx, next) => {
  try {
    isLogin(ctx, next);
    const {
      id,
      name,
      dataId,
      star,
      topTitle,
      topCost,
      secondTitle,
      secondCost,
      lastTitle,
      lastCost,
      womenRatio,
      brush,
      type,
      updateRouter,
      remark,
      platform,
    } = ctx.request.body;
    const res = await mysql("cPublicNumber").where({
      id,
    });
    let updateTime = "";
    if (res) {
      if (
        res[0].topCost !== topCost ||
        res[0].secondCost !== secondCost ||
        res[0].lastCost !== lastCost
      ) {
        updateTime = new Date();
      }
    }
    if (id) {
      const updateObj = {
        name,
        star,
        dataid: dataId,
        toptitle: topTitle,
        topcost: topCost,
        secondtitle: secondTitle,
        secondcost: secondCost,
        lasttitle: lastTitle,
        lastcost: lastCost,
        womenratio: womenRatio,
        updateRouter: updateRouter,
        remark,
        brush,
        type,
        platform,
      };
      if (updateTime) {
        updateObj.updateTime = updateTime;
      }
      await mysql("cPublicNumber").update(updateObj).where({
        id,
      });
    }
    ctx.state.data = {
      tip: "修改成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.updateImg = async (ctx, next) => {
  // starImage
  try {
    const { starImage, id } = ctx.request.body;
    if (id) {
      await mysql("cPublicNumber")
        .update({
          starImage,
        })
        .where({
          id,
        });
    }
    ctx.state.data = {
      tip: "修改成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.changeData = async (ctx, next) => {
  // starImage
  try {
    const { toData, fromData } = ctx.request.body;
    if (toData && fromData) {
      const toUser = await mysql("cUser").where({ id: toData });
      const fromUser = await mysql("cUser").where({ id: fromData });

      let res = await mysql("cPublicNumber").where({ userId: fromData });
      if (res.length) {
        res.forEach(async (item) => {
          const updateObj = { userId: toData, updateRouter: toUser[0].name };
          await mysql("cPublicNumber").update(updateObj).where({
            id: item.id,
          });
        });
      }

      res = await mysql("cPublicNumber").where({
        updateRouter: fromUser[0].name,
      });
      if (res.length) {
        res.forEach(async (item) => {
          const updateObj = { updateRouter: toUser[0].name };
          await mysql("cPublicNumber").update(updateObj).where({
            id: item.id,
          });
        });
      }

      res = await mysql("cCustomer").where({ userId: fromData });
      if (res.length) {
        res.forEach(async (item) => {
          const updateObj = { userId: toData };
          await mysql("cCustomer").update(updateObj).where({
            id: item.id,
          });
        });
      }

      res = await mysql("cPlan").where({ userId: fromData });
      if (res.length) {
        res.forEach(async (item) => {
          const updateObj = { userId: toData };
          await mysql("cPlan").update(updateObj).where({
            id: item.id,
          });
        });
      }

      ctx.state.data = {
        tip: "迁移成功",
      };
    } else {
      ctx.state.data = {
        tip: "数据有误，迁移失败",
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};
