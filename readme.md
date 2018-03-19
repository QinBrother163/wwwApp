环境搭建
-
+ 安装node 我的版本是v6.10.0，上 https://nodejs.org/en/ 下载v6.10.x稳定版
+ 配置淘宝cnpm https://npm.taobao.org/
  `npm install -g cnpm --registry=https://registry.npm.taobao.org`

命令提示
-
+ `cnpm install --no-bin-links` Windows下安装依赖，重点是**no bin links**
+ `cnpm run dev`  生成开发版本代码
+ `cnpm run prod` 生成部署版本代码

目录结构
-
+ **node_modules** #npm安装的库，只有非人类才关注它
+ **public** #生产输出文件夹，服务器部署的就是它
+ **resources** #程序员工作的地方

