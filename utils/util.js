const crypto = require("crypto");
const mysql = require("./mysql");

module.exports.response = (code, data) => {
  return {
    code,
    data,
  };
};

module.exports.md5 = (str) => {
  const md5 = crypto.createHash("md5").update(str);
  return md5.digest("hex").toUpperCase();
};

module.exports.isLogin = async (ctx, next) => {
  const { openid } = ctx.header;

  const data = await mysql("cUser").where({
    openId: openid,
  });
  if (data.length === 0) {
    ctx.status = 401;
  }
};
