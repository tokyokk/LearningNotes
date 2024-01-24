import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
    { text: '快速导航', icon: 'navigation', link: '/quicknav/' },
    { text: '博客主页', icon: 'blog', link: '/blog/' },
    { text: 'Java学习教程', icon: 'java', link: '/notes/' },
    { text: 'web学习教程', icon: 'note', link: '/web/' },
    { text: 'SpringCloud学习教程', icon: 'cache', link: '/springcloud/' },
    { text: '分布式微服务架构', icon: 'read', link: '/distributed/' },
    {
        text: '资源宝库',
        icon: 'advance',
        prefix: '/resources/',
        children: [
            {
                text: '书籍资源',
                icon: 'animation',
                link: 'books/',
            },
            {
                text: '影音资源',
                icon: 'play',
                link: 'videos/',
            },
        ],
    },
])
