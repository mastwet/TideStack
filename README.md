<h1 align="center" style="font-size:3rem;font-weight:900;letter-spacing:2px;color:#3b82f6;margin-bottom:0.5em;">
  TideStack
</h1>
<p align="center" style="font-size:1.2rem;color:#888;margin-top:0;">
  <strong>AKA:</strong> WebStack-vue3
</p>
<h2 align="center" style="font-size:1.5rem;font-weight:700;color:#16a34a;margin-top:0.5em;">
  MAKE WEBSTACK GREAT AGAIN!
</h2>
<p align="center">
  <img src="src/assets/images/webstack_banner_cn.png" alt="WebStack Banner" width="600"/>
</p>

> 一个基于 Vue 3 + Vite + Element Plus 的极简美观网址导航项目，支持通过配置文件一键管理侧边栏和主页内容。
> 好消息！目前TideStack已经完全迁移至ElementUI！界面更美观了！
> 如果你给个star，作者就继续开发~

## 项目简介

TideStack (WebStack-vue3) ，重构自[WebStack-Vue](https://github.com/Anjaxs/WebStack-vue/tree/master)（由于原项目已停止更新且本人无法运行，该项目也属于WebStack生态一员），是一个开箱即用的网址导航站点模板，可通过VUE3脚手架一键生成导航网站内容。所有导航内容均通过配置文件（data.json）集中管理，支持分组、多级分类、图标、描述、多语言等。

## 主要特性

- 🚀 基于 Vue 3 + Vite + ElementPlus，极速开发体验
- 🗂️ 所有导航内容均通过 data.json 配置，维护简单
- 🧩 侧边栏与主页内容完全同步，递归支持多级分组
- 🌏 支持中英文切换
- 🎨 响应式设计，适配主流设备
- 💡 结构清晰，易于二次开发

## 目录结构

```
webstack-vue3/
├── public/                # 静态资源
│   └── assets/            # 图片、JS、favicon 等
├── src/
│   ├── assets/
│   │   ├── css/           # 样式文件
│   │   ├── data.json      # 网址导航配置文件（核心）
│   │   └── images/        # logo、banner 等图片
│   ├── components/
│   │   ├── Footer.vue
│   │   ├── WebItem.vue
│   │   ├── SidebarMenuItem.vue      # 侧边栏递归组件
│   │   └── MainContentItem.vue      # 主页内容递归组件
│   ├── views/
│   │   ├── index.vue      # 主页
│   │   └── about.vue      # 关于页面
│   ├── App.vue
│   └── main.js
├── package.json
├── vite.config.js
└── README.md
```

## 安装与运行

1. 安装依赖

```bash
pnpm install   # 或 npm install / yarn install
```

2. 启动开发环境

```bash
pnpm dev       # 或 npm run dev / yarn dev
```

3. 打包生产环境

```bash
pnpm build     # 或 npm run build / yarn build
```

4. 预览生产环境

```bash
pnpm preview   # 或 npm run preview / yarn preview
```

## 配置文件说明

所有导航内容均在 `src/assets/data.json` 中维护。支持分组、子分组、网站列表、图标、描述等字段。

### 示例结构

```json
[
  {
    "name": "常用推荐",
    "en_name": "Recommended",
    "icon": "linecons-star",
    "web": [
      { "url": "https://dribbble.com/", "logo": "assets/images/logos/dribbble.png", "title": "Dribbble", "desc": "全球UI设计师作品分享平台。" }
    ]
  },
  {
    "name": "灵感采集",
    "en_name": "Inspiration",
    "icon": "linecons-lightbulb",
    "children": [
      {
        "name": "发现产品",
        "en_name": "Product",
        "web": [ ... ]
      }
    ]
  }
]
```

- `name`/`en_name`：分组/子分组名称（支持多语言）
- `icon`：分组图标（可选）
- `web`：网站列表（数组）
- `children`：子分组（递归结构）
- `is_hot`：是否高亮显示（可选）

只需编辑 data.json，侧边栏和主页内容会自动同步，无需改动代码。

## 技术栈

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- [pnpm](https://pnpm.io/)（推荐，但支持 npm/yarn）
- 现代 CSS/HTML

## 贡献指南

欢迎 PR、Issue 及建议！

1. Fork 本仓库
2. 新建分支进行开发
3. 提交 PR

## License

MIT

## 鸣谢/参考

- [WebStackPage](https://github.com/WebStackPage/WebStackPage.github.io) 万恶之源（什）
- [WebStack-Vue](https://github.com/Anjaxs/WebStack-vue/tree/master) Vue 版本原作者
- [mastwet](https://github.com/mastwet) 当前维护者
- [Anjaxs](https://github.com/Anjaxs) Vue 版本原作者
- 以及所有开源贡献者

## TODO

- [ ] 实现主题切换。
- [ ] 实现全站真正的中英文切换（i18n），包括所有界面元素和网站条目的多语言支持。
