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
              text: "Tutorial", link: "/en/tutorial", items: [
                {
                  text: "Connecting to and Disconnecting from the Server", link: "/en/connecting-disconnecting"
                }, {
                  text: "Using mysql in Batch Mode", link: "/en/batch-mode",
                }, {
                  text: "Examples of Common Queries", link: "/en/examples", items: [
                    {
                      text: "Calculating Visits Per Day", link: "/en/calculating-days",
                    },
                  ]
                }, {
                  text: "Using MySQL with Apache", link: "/en/apache"
                }
              ]
            }, {
              text: "MySQL Programs", link: "/en/programs",
            }, {
              text: "Optimization",
              link: "/en/optimization",
              items: [
                {
                  text: "Optimization Overview",
                  link: "/en/optimize-overview.md"
                }, {
                  text: "Controlling the Query Optimizer", link: "/en/controlling-optimizer"
                }, {
                  text: "Buffering and Caching", link: "/en/buffering-caching"
                }, 
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
              text: "教程", link: "/zh/tutorial", items: [
                {
                  text: "连接到服务器和从服务器断开", link: "/zh/connecting-disconnecting"
                }, {
                  text: "在批处理模式使用 mysql", link: "/zh/batch-mode",
                }, {
                  text: "常见查询示例", link: "/zh/examples", items: [
                    {
                      text: "计算每日访问量", link: "/zh/calculating-days",
                    },
                  ]
                }, {
                  text: "在 Apache 中使用 MySQL", link: "/zh/apache"
                }
              ]
            }, {
              text: "MySQL 程序", link: "/zh/programs",
            }, {
              text: "优化", link: "/zh/optimization",
              items: [
                {
                  text: "优化概述",
                  link: "/zh/optimize-overview.md"
                }, {
                  text: "控制查询优化器", link: "/zh/controlling-optimizer"
                }, {
                  text: "缓冲和缓存", link: "/zh/buffering-caching"
                }, 
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
