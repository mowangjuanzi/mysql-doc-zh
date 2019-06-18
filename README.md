# mysql 中文翻译文档

## 预览

GitHub Page: http://mysql-doc.baoguoxiao.com/zh-cn/

看云：https://www.kancloud.cn/baoguoxiao0538/mysql-8-0-chinese-doc

## 创建过程

首先你要确认你的系统中存在`nodejs`和`npm`.

然后执行以下命令安装环境

```bash
npm install gitbook-cli gh-pages -g
```

部署环境：

```bash
git clone https://github.com/mowangjuanzi/mysql-chinese-doc.git
cd mysql-chinese-doc
gitbook install
gitbook serve
```

## 部署到gh-pages

```bash
gitbook build
gh-pages -d ./_book/
```

## 贡献

本人英语渣渣，完全靠着谷歌翻译协助。

希望大家都能多多贡献一下。然后大家提供一份质量高的 MySQL 中文文档。人人为我，我为人人！！！