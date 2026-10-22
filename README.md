# Feynman / 林登凯 · 个人作品集

纸墨气质的静态作品集。中文为主，署名 **Feynman / 林登凯**。

> 英文名拼写为 **Feynman**。GitHub 用户名仍为 `FeynmenLin`（仓库与链接沿用该拼写）。

**线上地址：** [https://feynmenlin.github.io/feynman-portfolio/](https://feynmenlin.github.io/feynman-portfolio/)

## 本地预览

```bash
cd /workspace/feynman-portfolio   # 或本仓库根目录
python3 -m http.server 8765
# 浏览器打开 http://localhost:8765
```

也可直接打开 `index.html`（部分相对路径在 `file://` 下可能受限，建议用本地服务器）。

## 结构

```
feynman-portfolio/
├── index.html              # 首页：Hero / 精选 / 更多 / 联系
├── 404.html                # GitHub Pages 自定义 404
├── styles.css
├── script.js
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/                 # 封面、案例截图、favicon、OG、PWA 图标
└── projects/               # 各项目功能说明页
    ├── projects.css
    ├── mall.html
    ├── library.html
    ├── ledger.html
    ├── academy.html
    ├── brand.html
    ├── courseware.html
    └── ai-assistants.html
```

## 页面逻辑

每个精选 / 更多项目的卡片都进入 **功能页**（真实界面 + 功能清单）。  
有公开入口的项目，在功能页顶部与底部提供 **打开线上版 / 演示站** 按钮：

| 项目 | 功能页 | 线上入口 |
|------|--------|----------|
| 伍行界官网商城 | `projects/mall.html` | https://wuxingjie.vip |
| Feynman的图书馆 | `projects/library.html` | 需登录（不公开试读） |
| 伍行界账本 | `projects/ledger.html` | https://demo.wuxingjie.vip/ |
| 一米学院 | `projects/academy.html` | https://wuxingjie.vip/academy.html |
| 品牌手册 | `projects/brand.html` | https://wuxingjie.vip/brand.html |
| 课程与互动课件 | `projects/courseware.html` | 无公开入口 |
| AI 学习助手 | `projects/ai-assistants.html` | 个人工具，无试用 |

不公开：生产账本后台、Contabo 裸 IP、业务客服邮箱、需登录的阅读器直链。  
未收录：vox、武道日课、KXchat。

## 视觉与交互

- 暖纸 + 墨色；细微纸纹、滚动渐显、卡片悬停与印章光晕
- Favicon / Apple Touch Icon 来自印章标识；分享图见 `assets/og-cover.jpg`
- 桌面端可选磁性按钮与自定义光标（触控与 `prefers-reduced-motion` 下关闭）

## 部署（GitHub Pages）

仓库：`FeynmenLin/feynman-portfolio` · Source：`main` / 根目录。  
推送 `main` 后约一分钟可在上述线上地址访问。

## 许可

个人作品展示页；站内链出的第三方产品与品牌归各自所有者。
