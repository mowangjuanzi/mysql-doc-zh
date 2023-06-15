import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MySQL 中文文档",
  ignoreDeadLinks: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: {
      "/en/": [
        {
          items: [
            {
              text: "MySQL 8.0 Reference Manual", link: "/en/",
            }, {
              text: "Preface and Legal Notices", link: "/en/preface",
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
          items: [
            {
              text: "MySQL 8.0 参考手册", link: "/zh/"
            }, {
              text: "前言和法律条款", link: "/zh/preface",
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
      { icon: 'github', link: 'https://github.com/mowangjuanzi/mysql-chinese-doc' }
    ]
  }
})
