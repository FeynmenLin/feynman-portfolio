# Feynman / 林登凯 · 个人作品集

单页个人作品集静态站。中文为主，署名 **Feynman / 林登凯**。

> 英文名拼写为 **Feynman**。GitHub 用户名仍为 `FeynmenLin`（仓库与链接沿用该拼写）。

## 本地预览

```bash
cd feynman-portfolio
python3 -m http.server 8765
# 浏览器打开 http://localhost:8765
```

或直接打开 `index.html`。

## 结构

```
feynman-portfolio/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── featured-mall.jpg
    ├── featured-library.jpg
    └── featured-ledger.jpg
```

## 页面分区

1. **Hero** — Feynman / 林登凯，角色与一句话介绍（纸墨气质 + 光晕 / 印章式标识）
2. **精选** — 伍行界官网商城、Feynman的图书馆（案例）、伍行界账本（案例），含展示图
3. **更多项目** — 一米学院、品牌手册、课程与互动课件、AI 学习助手
4. **页脚** — GitHub 联系入口

不公开：生产账本后台、Contabo 裸 IP、业务客服邮箱、需登录的阅读器直链试读。  
未收录：vox、武道日课、KXchat。

## 视觉说明

- 暖纸 + 墨色方向，细微纸纹、滚动渐显、精选卡悬停抬升与图片缩放
- 桌面端可选磁性按钮与自定义光标（触控与 `prefers-reduced-motion` 下关闭）

## 部署到 GitHub Pages（建议）

建议仓库名：`portfolio` 或 `feynman-portfolio`。

1. 新建公开仓库（例如 `FeynmenLin/portfolio`）
2. 将本目录内容推到 `main`（或 `gh-pages`）
3. 仓库 Settings → Pages → Source 选该分支根目录
4. 站点地址形如：`https://feynmenlin.github.io/portfolio/`

## 许可

个人作品展示页；站内链出的第三方产品与品牌归各自所有者。
