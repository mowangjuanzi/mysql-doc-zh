import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MySQL 中文文档",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    sidebar: {
      "/en/": [
        {
          text: "MySQL 8.0 Reference Manual",
          items: [
            {
              text: "MySQL 8.0 Reference Manual", link: "/en/"
            }
          ]
        }
      ],
      "/zh/": [
        {
          text: "MySQL 8.0 参考手册",
          items: [
            {
              text: "MySQL 8.0 参考手册", link: "/zh/"
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
