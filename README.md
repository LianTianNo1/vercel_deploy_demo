# 项目名称

chat-client | chat-serve

这是一个使用Vue2+Axios+ElementUI编写的ChatGPT聊天室前端项目，与OpenAI进行交互。后端使用Koa2+Redis+Koa-session搭建。

## 前置安装

- Node.js：请前往官网下载并安装Node.js，下载地址：https://nodejs.org/
- Redis：请前往官网下载并安装Redis，下载地址：https://redis.io/download

## Node.js安装教程

1. 前往Node.js官网下载对应版本的安装包，下载地址：https://nodejs.org/
2. 双击安装包进行安装，一路点击“下一步”即可
3. 安装完成后，在命令行中输入以下命令，查看Node.js版本号：

```
node -v
```

4. 如果能够正确输出版本号，则说明Node.js安装成功

## Redis安装教程

1. 前往Redis官网下载对应版本的安装包，下载地址：https://redis.io/download
2. 解压安装包到指定目录，例如解压到C:\redis目录下
3. 在命令行中进入解压后的目录，例如：

```
cd C:\redis
```

4. 在命令行中输入以下命令，启动Redis服务：

```
redis-server.exe
```

5. 在命令行中输入以下命令，启动Redis客户端：

```
redis-cli.exe
```

6. 如果能够正确启动Redis客户端，则说明Redis安装成功



## 依赖安装

### 前端

在项目根目录下运行以下命令安装依赖：

```bash
yarn install
```

### 后端

在项目根目录下运行以下命令安装依赖：

```bash
npm install
```

## 项目启动

### 前端

在项目根目录下运行以下命令启动前端项目：

```bash
yarn serve
```

### 后端

在项目根目录下运行以下命令启动后端项目：

```bash
npm run start
```

## 项目打包

在项目根目录下运行以下命令启动前端项目：

```bash
yarn build
```

然后把dist文件夹的打包文件放进后端public文件

浏览器访问 http://localhost:3013 即可



## 注意事项

- 前端项目默认运行在 http://localhost:8080
- 后端项目默认运行在 http://localhost:3013
- 在.env文件中，OPENAI_API_BASE_URL和OPENAI_API_KEY需要根据实际情况进行修改,建议使用自己的反向代理，当前默认代理可能会很慢
- 后端项目需要连接Redis数据库，请确保已经正确配置了Redis数据库信息
- 前端项目中src/api/request中baseURL需要根据实际情况进行修改
- 该项目没有使用数据库，并不会存储你的key
- 如果使用默认的key，将使用我服务器默认的key，我的key是5$额度的测试号，不保证随时失效
- 如果我的账号额度用完，还想继续使用，需要使用自己的key

## 前端项目地址

https://github.com/LianTianNo1/chat_client

## 后端项目地址

https://github.com/LianTianNo1/chat_serve

## Demo地址

http://120.25.249.159:3013/

## 截图

