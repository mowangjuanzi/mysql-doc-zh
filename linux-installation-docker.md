# 2.5.6 在 Linux 上使用 Docker 部署 MySQL

Docker 部署框架支持 MySQL 服务器的轻松安装和配置. 本节解释如何使用MySQL服务器Docker映像.

在你使用 MySQL 服务器 Docker 镜像之前, 需要在系统上安装 Docker. 参阅 [安装 Docker](https://docs.docker.com/engine/installation/) 获取详情.

> **重要**
> 
> 你需要使用 `sudo` 命令运行 `docker` 命令, 或者创建 `docker` 用户组, 然后添加任何想要运行 `docker` 命令的用户. 在[此](https://docs.docker.com/engine/installation/linux/linux-postinstall/)查看详情. 因为 Docker 容器总是使用 root 权限运行, 你应该理解 [Docker daemon attack surface](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface) 并适当降低相关风险.