# aliddns-node-client
阿里云DDNS nodejs 实现监听服务器ip变化 


# 使用教程

## pm2 部署方式
### 1、安装 nodejs 环境

### 2、clone 项目代码

### 3、安装依赖
```
cd aliddns-node-client
```
```
npm install
```

### 4、修改config.js
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

## Docker 部署模式
```
// 拉取镜像
docker pull coldice945/aliddns-node-client
// 运行 docker 镜像，记得要改对应的参数
docker run -d coldice945/aliddns-node-client \
  --name aliddns-node-client \
  -e DOMAIN=["xxx.com", "www.xxx.com"] \
  -e CRON_RULE=0 */5 * * * * \
  -e ACCESSKEY_ID=xxxx \
  -e ACCESS_KEY_SECRET=xxxx \
```
