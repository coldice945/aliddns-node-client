# aliddns-node-client
阿里云DDNS nodejs 实现监听服务器ip变化 


# 使用教程


### 1、安装nodejs环境

### 2、clone 项目代码

### 3、安装依赖
```
cd aliddns-node-client
```
```
npm install
```

### 4、修改config.json 
    accessKeyId       你的阿里云accessKeyId
    accessKeySecret   你的阿里云accessKeySecret
    domain            域名  例如  ["baidu.com", "fomav.cn"] 或者 fomav.cn
    cronRule          定期任务时间，* * * * * * 是每秒执行一次，0 * * * * * 是每分钟执行一次，0 */5 * * * * 是每五分钟执行一次

### 5、运行程序（开发模式）
```
npm run start
```

### 6、后台运行（普通部署上线）
```
npm install -g pm2
```
随后执行 
```
pm2 start ./pm2.json
```

### 7、开机自启动
```
sudo pm2 startup
sudo pm2 save 
``` 
重启机器验证
```
sudo systemctl reboot 
```

### 8、取消开机自启动
```
sudo pm2 unstartup systemd
```

### 9、Docker 部署模式
```
docker build -t aliddns-node-client -f Dockerfile .
docker run -d aliddns-node-client --name aliddns-node-client
```
