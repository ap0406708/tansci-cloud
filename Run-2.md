20240629 - spring cloud 安装 2

1。Nacos
./startup.sh -m standalone

http://192.168.137.130:8848/nacos/index.html#/configurationManagement?serverId=center&group=&dataId=&namespace=&appName=&pageSize=&pageNo=

2. sentinel
   nohup  java -Dserver.port=8858 -Dcsp.sentinel.dashboard.server=localhost:8718 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.8.3.jar > log-sentinel-0629-1.txt 2>&1 &

http://192.168.137.130:8858/#/login
账号：sentinel
密码：sentinel



3. Seata
   ./seata-server.sh

http://192.168.137.130:7091/#/transaction/list

4.   前端

启动前端
npm install  # 初始化项目

npm run dev  # 启动项目
npm install
npm run dev
http://localhost:3000/


=====================================

1.
Caused by: java.lang.reflect.InaccessibleObjectException: Unable to make protected final java.lang.Class java.lang.ClassLoader.defineClass(java.lang.String,byte[],int,int,java.security.ProtectionDomain) throws java.lang.ClassFormatError accessible: m


https://blog.csdn.net/qq_27525611/article/details/108685030
IDEA可以在运行配置中的VM options中添加
--illegal-access=deny --add-opens java.base/java.lang=ALL-UNNAMED

=================


模块启动顺序：
● TansciAdminServiceApplication

● TansciAuthApplication

http://127.0.0.1:9001/doc.html#/SwaggerModels/tansci-auth

● TansciGatewayApplication
● TansciScheduledServiceApplication





