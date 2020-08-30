# MedicalWar
医疗市场商战模拟

## Dev
### 创建虚拟环境
```shell
python3 -m venv venv
// Mac/Linux
source venv/bin/activate
// Windows
venv/Scripts/activate.bat
```
### 安装python依赖
pip install -r requirements.yml
### 更新python依赖
pip3 freeze >requirements.yml

### 安装node依赖
好像是在web内npm install
有yarn用yarn，我这mac预览版，yarn装不上
### 前端启动
cd web
quasar dev
### 后端启动
在MedicalWar目录下
python3 -m app.main
