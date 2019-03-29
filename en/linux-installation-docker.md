# 2.5.6 Deploying MySQL on Linux with Docker

The Docker deployment framework supports easy installation and configuration of MySQL Server. This section explains how to use a MySQL Server Docker image.

You need to have Docker installed on your system before you can use a MySQL Server Docker image. See [Install Docker](https://docs.docker.com/engine/installation/) for instructions.

> **Important**
>
> You need to either run `docker` commands with `sudo`, or create a `docker` usergroup, and then add to it any users who want to run `docker` commands. See details [here](https://docs.docker.com/engine/installation/linux/linux-postinstall/). Because Docker containers are always run with root privileges, you should understand the [Docker daemon attack surface](https://docs.docker.com/engine/security/security/#docker-daemon-attack-surface) and properly mitigate the related risks.