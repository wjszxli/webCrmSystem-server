
## 开始使用

#### 安装依赖

```bash
# 安装全局依赖
npm i pm2 nodemon -g

# 安装项目依赖
npm i
```

#### 启动项目

```bash
# 开发环境，监听文件变化自动重启，并会输出 debug 信息
yarn run dev

# 线上部署环境
yarn start
```


## 项目结构

```
crm-server
├── README.md
├── app.js
├── controllers
│   ├── index.js
│   └── user.js
├── middlewares
│   └── response.js
├── config.js
├── package.json
├── process.json
├── nodemon.json
└── routes
    └── index.js
```
`app.js` 是主入口文件，

`routes/index.js` 是路由定义文件

`controllers` 存放所有业务逻辑的目录，`index.js` 不需要修改，他会动态的将 `controllers` 文件夹下的目录结构映射成 modules 的 Object

```javascript
// index.js 输出
{
  login: require('login'),
  message: require('message'),
  tunnel: require('tunnel'),
  upload: require('upload'),
  user: require('user')
}
```



`config.js` 主要的配置如下：

```javascript
{
  port: '5757',    // 项目启动的端口

  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '',
    char: 'utf8'
  }
}
```
