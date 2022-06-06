const mysql = require("../utils/mysql");

module.exports.updateAuthor = async (ctx, next) => {
  try {
    const { id, user } = ctx.request.body;
    await mysql("cAuthor")
      .update({
        user,
      })
      .where({
        id,
      });
    ctx.state.data = {
      tip: "保存成功",
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAuthor = async (ctx, next) => {
  try {
    const { pageIndex, pageSize } = ctx.request.query;

    const res = await mysql("cAuthor")
      .limit(pageSize)
      .offset((pageIndex - 1) * pageSize);

    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getAuthorCount = async (ctx, next) => {
  try {
    const res = await mysql("cAuthor").count("id as count");
    ctx.state.data = res;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.isAuthor = async (ctx, next) => {
  try {
    let tip = 0;
    const { author, user } = ctx.request.query;
    const res = await mysql("cAuthor").where({
      author,
    });
    if (res.length) {
      if (res[0].user) {
        const userData = res[0].user.split(",");

        const isAuth = userData.findIndex((v) => v === user);
        if (isAuth !== -1) {
          tip = 1;
        }
      }
    }
    ctx.state.data = {
      tip,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports.getDataById = async (ctx, next) => {
  try {
    const { id } = ctx.request.query;
    res = await mysql("cAuthor").where({
      id,
    });
    ctx.state.data = res;
  } catch (error) {
    console.log("error", error);
    throw new Error(error);
  }
};

module.exports.getAuthorByOpenId = async (openId) => {
  try {
    const res = await mysql("cUser").where({
      openId,
    });
    if (!res || !res.length) return null;
    const id = res[0].author;
    return res;
  } catch (error) {
    throw new Error(error);
  }
};
