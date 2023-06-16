import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MySQL 8.0 文档",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: {
      "/en/": [
        {
          text: "MySQL 8.0 Reference Manual", 
          link: "/en/",
          items: [
            {
              text: "Preface and Legal Notices", link: "/en/preface",
            }, {
              text: "General Information", link: "/en/introduction",
            }, {
              text: "Installing and Upgrading MySQL", link: "/en/installing",
            }, {
              text: "Tutorial", link: "/en/tutorial",
            }, {
              text: "Optimization",
              link: "/en/optimization",
              items: [
                {
                  text: "Optimization Overview",
                  link: "/en/optimize-overview.md"
                }
              ]
            }
          ]
        }
      ],
      "/zh/": [
        {
          text: "MySQL 8.0 参考手册",
          link: "/zh/",
          items: [
            {
              text: "前言和法律条款", link: "/zh/preface",
            }, {
              text: "基本信息", link: "/zh/introduction",
            }, {
              text: "安装和升级 MySQL", link: "/zh/installing",
            }, {
              text: "教程", link: "/zh/tutorial",
            }, {
              text: "优化", link: "/zh/optimization",
              items: [
                {
                  text: "优化概述",
                  link: "/zh/optimize-overview.md"
                }
              ]
            }
          ]
        }
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mowangjuanzi/mysql-doc-zh' }
    ],

    editLink: {
      pattern: 'https://github.com/mowangjuanzi/mysql-chinese-doc/tree/master/docs/:path',
      text: "在 Github 上查看"
    }
  }
})
