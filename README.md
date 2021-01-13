# MedicalWar
医疗市场商战模拟

## Dev 开发配置
### 创建虚拟环境
```shell
python3 -m venv venv
// Mac/Linux
source venv/bin/activate
// Windows
venv\Scripts\activate
```
### 安装python依赖
pip install -r requirements.yml

### 更新python依赖
pip3 freeze >requirements.yml

### 安装node依赖
在web目录下
yarn install
npm install
好像是在web内npm install
有yarn用yarn，我这mac预览版，yarn装不上,

### 前端启动
cd web
quasar dev

### 后端启动
在MedicalWar目录下
python3 -m app.main

### 部署
#### 文件夹说明:
> web 是前端项目
> web/src 是前端项目源码
> web/dist 是前端项目打包
> app 是后端服务
> app/main.py 是后端Server的入口文件
> app/config 内存放后端配置
> app/config/secure.py 存放包括数据库等敏感信息
> app/config/setting.py 存放项目基础设置，包括Cookir、Token过期时间设定
> app/data 是每一局的信息，每一局的具体数据为本地CSV缓存（其他信息由数据库存储）
> docs 存放一些文本信息

系统Linux，环境Python3.6以上
1. 安装数据库，项目本身使用Mysql，创建数据库、配置好账号登录权限，添加管理员账号，启动数据库服务
2. 修改后端项目数据库配置
3. 安装Nginx、gunicorn
4. 配置Nginx路径，主页为web/dist下的index.html
5. 配置服务器防火墙，将5000端口暴露
5. 启动后端服务，例如
```shell
# 在项目目录下
gunicorn -w 4 -D -b 0.0.0.0:5000 app.main:app
# -w 为多线程，需要根据具体情况开启，要开启多线程需要修改Secure下的SECRET_KEY，写一个固定的值
# -D 开启守护进程
# -b 绑定端口
```


