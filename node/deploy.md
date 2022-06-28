## node 项目 部署
  - pm2 基本了解
    - pm2（process manager）是一个进程管理工具，维护一个进程列表，可以用它来管理你的node进程，负责所有正在运行的进程，并查看node进程的状态，也支持性能监控，负载均衡等功能
    - 优点
      - 监听文件变化，自动重启程序
      - 支持性能监控
      - 负载均衡
      - 程序崩溃自动重启
      - 服务器重新启动时自动重新启动
      - 自动化部署项目
    - 常用命令
      - 启动node程序
        - `pm2 start start.js`
      - 启动进程并指定应用的程序名
        - `pm2 start app.js --name application1`
      - 集群模式启动
        ```
          // -i 表示 number-instances 实例数量
          // max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量
          pm2 start start.js -i max
        ```
      - 添加进程监视
        - `pm2 start app.js --name start --watch` 
        - 在文件改变的时候会重新启动程序
      - 列出所有进程
        - pm2 list
        - pm2 ls // 简写
      - 从进程列表中删除进程
        -  pm2 delete [appname] | id
        - 进程名 或 进程id
        -  pm2 delete all 删除所有进程
      - 查看某个进程具体情况
        - pm2 describe app
      - 查看进程的资源消耗情况
        -  pm2 monit
      - 重启进程
        - pm2 restart app // 重启指定名称的进程
        - pm2 restart all // 重启所有进程

  - 通过pm2配置文件来自动部署项目
    - 确保服务器安装了pm2 `npm install pm2 -g`
    - 在项目根目录下新建一个 deploy.yaml 文件
      ```yaml
        # deploy.yaml
        apps:
          - script: ./start.js       # 入口文件
            name: 'app'              # 程序名称
            env:                     # 环境变量
              COMMON_VARIABLE: true
            env_production:
              NODE_ENV: production

        deploy:                     # 部署脚本
          production:               # 生产环境
            user: lentoo            # 服务器的用户名
            host: 192.168.2.166     # 服务器的ip地址
            port: 22                # ssh端口
            ref: origin/master      # 要拉取的git分支
            ssh_options: StrictHostKeyChecking=no # SSH 公钥检查
            repo: https://github.com/**.git # 远程仓库地址
            path: /home              # 拉取到服务器某个目录下
            pre-deploy: git fetch --all # 部署前执行
            post-deploy: npm install &&  pm2 reload deploy.yaml --env production # 部署后执行
            env:
              NODE_ENV: production
      ```
    - 配置git的ssh免密认证
      - 略过
    - 使用pm2部署项目
      - 首次部署 `pm2 deploy deploy.yaml production setup`
      - 部署完成后，既可登陆服务器查看配置的目录下是否从git上拉取了项目
      - 再次部署 `pm2 deploy deploy.yaml production update`



