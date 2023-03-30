# 使用 node 镜像作为基础镜像
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 文件
COPY package*.json ./

# 安装生产环境依赖
RUN npm install --only=production

# 复制整个项目文件到工作目录
COPY . .

# 将 Vue 项目的构建文件拷贝到容器中的公共文件夹中
COPY public /app/public

ENV OPENAI_API_KEY=""

# 对外开放容器的端口号
EXPOSE 3013

# 启动应用程序
CMD ["npm", "start"]
