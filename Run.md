20240628 - spring cloud 安装

1. 装 nacos
   https://blog.csdn.net/xhmico/article/details/136647509
   tar -zxvf nacos-server-x.x.x.tar.gz
   nacos 的配置基本上都在 nacos/conf/application.properties 文件中
   https://github.com/alibaba/nacos/releases?page=1
   http://192.168.137.130:8848/nacos/index.html
   要开防火墙
   https://blog.csdn.net/babyQ_tester/article/details/107874530
   [root@localhost conf]# firewall-cmd --state                                                                                                                                                                    
   running                                                                                                                                                                                                        
   [root@localhost conf]# firewall-cmd --zone=public --add-port=8848/tcp --permanent                                                                                                                              
   success                                                                                                                                                                                                        
   [root@localhost conf]# systemctl restart firewalld.service                                                                                                                                                     
   [root@localhost conf]# firewall-cmd --reload                                                                                                                                                                   
   success                                                                                                                                                                                                        
   [root@localhost conf]# firewall-cmd --list-ports                                                                                                                                                               
   8848/tcp

firewall-cmd --reload

firewall-cmd --zone=public --add-port=8848/tcp --permanent     nacos admin
firewall-cmd --zone=public --add-port=6379/tcp --permanent     redis
firewall-cmd --zone=public --add-port=7091/tcp --permanent      Seata  admin
firewall-cmd --zone=public --add-port=8091/tcp --permanent      Seata

firewall-cmd --zone=public --add-port=8858/tcp --permanent      sentinel admin
firewall-cmd --zone=public --add-port=8718/tcp --permanent

单机模式运行
sh startup.sh -m standalone
cat /soft/nacos/nacos/logs/start.out

1。装 java
https://blog.csdn.net/qq_43329216/article/details/118385502
tar -zxvf jdk-8u161-linux-x64.tar.gz
vim /etc/profile
export JAVA_HOME=/source/java/jdk1.8.0_161 #你自己的安装路径
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
. /etc/profile
java -version

2. 装 docker
   Linux安装最新版Docker完整教程（建议收藏）_linux安装docker教程-CSDN博客
   yum install -y yum-utils device-mapper-persistent-data lvm2
   yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
   yum install -y docker-ce
#启动docker命令
systemctl start docker
#设置开机自启命令
systemctl enable docker
#查看docker版本命令
docker version
配置docker国内镜像源
#创建docker配置文件目录
mkdir -p /etc/docker
#添加配置内容
tee /etc/docker/daemon.json <<-'EOF'
{
"registry-mirrors": ["https://vsxcs7sq.mirror.aliyuncs.com"]
}
EOF
#重启docker
systemctl restart docker

最后改成了：
{                                                                                                                                                                                                              
"registry-mirrors": [                                                                                                                                                                                      
"https://vsxcs7sq.mirror.aliyuncs.com",                                                                                                                                                                
"https://dockerproxy.com",                                                                                                                                                                             
"https://mirror.baidubce.com",                                                                                                                                                                         
"https://docker.m.daocloud.io",                                                                                                                                                                        
"https://docker.nju.edu.cn",                                                                                                                                                                           
"https://docker.mirrors.sjtug.sjtu.edu.cn",                                                                                                                                                            
"https://registry.docker-cn.com",                                                                                                                                                                      
"https://docker.mirrors.ustc.edu.cn",                                                                                                                                                                  
"https://hub-mirror.c.163.com",                                                                                                                                                                        
"https://ccr.ccs.tencentyun.com"                                                                                                                                                                       
]                                                                                                                                                                                                          
}

3. docker 装 mysql
   https://blog.csdn.net/qq_25482375/article/details/126250746
   sudo docker pull mysql:5.7
   docker images
   docker ps -a
   docker logs -f --tail 10 a4dac74d48f7

https://blog.csdn.net/BThinker/article/details/123471514
docker run \
--name mysql \
-d \
-p 3306:3306 \
--restart unless-stopped \
-v /mydata/mysql/log:/var/log/mysql \
-v /mydata/mysql/data:/var/lib/mysql \
-v /mydata/mysql/conf:/etc/mysql \
-e MYSQL_ROOT_PASSWORD=12345678 \
mysql:5.7

https://blog.csdn.net/klkxxy/article/details/121550100#:~:text=%E7%AC%AC%E4%B8%80%E6%AD%A5mysql%E5%AE%B9%E5%99%A8%201%20docker%20exec%20-it%20%E5%AE%B9%E5%99%A8ID%20%2Fbin%2Fbash%20%E7%AC%AC%E4%BA%8C%E6%AD%A5%E8%BF%9E%E6%8E%A5mysql,%3D%20PASSWORD%20%28%27%E8%AE%BE%E7%BD%AE%E7%9A%84%E5%AF%86%E7%A0%81%27%29%3B%20%E7%AC%AC%E5%9B%9B%E6%AD%A5%E9%87%8D%E5%90%AF%E9%87%8D%E5%90%AFmysql%E5%AE%B9%E5%99%A8%E5%8D%B3%E5%8F%AF%201%20docker%20r_docker%20%E8%AE%BE%E7%BD%AEroot%E5%90%AF%E5%8A%A8%E5%AF%86%E7%A0%81
docker exec -it 容器ID /bin/bash
mysql -uroot -p
SET PASSWORD FOR 'root' = PASSWORD('设置的密码');
docker restart 容器ID

https://blog.csdn.net/frdevolcqzyxynjds/article/details/119792558
先 docker ps -a
看到好几个容器镜像ID一样的，什么鬼，肯定是构建的时候搞错了呗

再把使用该容器镜像的容器 stop （如果已经stop的请直接下一步）
docker stop 使用该容器镜像的容器的ID

然后 rm掉
docker rm 使用该容器镜像的容器的ID

然后
docker rmi 该容器镜像ID

发现还是报错

那么好，终极解决方案（就是本文要点）

docker rmi -f 该容器镜像ID


