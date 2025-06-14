# 活动邀请小程序

## 项目简介
这是一个微信小程序，用于创建和管理活动邀请。项目基于TypeScript和Sass开发。

## 功能
- 首页：展示活动列表
- 活动：查看活动详情
- 个人中心：用户信息管理
- 创建活动：发起新活动
- 编辑活动：修改活动信息

## 页面结构
- `pages/index/index`：首页
- `pages/event/event`：活动详情
- `pages/profile/profile`：个人中心
- `pages/create/create`：创建活动
- `pages/edit/edit`：编辑活动

## 依赖
- `miniprogram-api-typings`：用于TypeScript支持

## 运行方式
1. 使用微信开发者工具导入项目
2. 运行`npm install`安装依赖
3. 点击编译运行

## 项目简介

本项目是一个基于微信小程序的活动邀请管理工具，支持活动的创建、编辑、筛选、查看和本地持久化，适合团队、朋友聚会等场景。

## 主要功能
- 活动列表展示（首页）
- 活动筛选（临近活动/过往活动）
- 活动详情查看
- 活动创建（支持选择时间、地点）
- 活动编辑（支持修改时间、地点、名称）
- 用户微信一键登录
- 个人中心页面
- 所有活动数据本地持久化

## 目录结构
```
miniprogram/
  ├── app.js / app.json / app.wxss
  ├── images/           # tabBar图标
  ├── pages/
  │    ├── index/       # 首页（活动列表、筛选）
  │    ├── event/       # 活动详情页
  │    ├── create/      # 创建活动页
  │    ├── edit/        # 编辑活动页
  │    └── profile/     # 个人中心页
  └── utils/            # 工具函数
```

## 使用说明
1. **微信开发者工具导入 miniprogram 目录**
2. **补充 images 目录下的 tabBar 图标**（home.png, event.png, user.png）
3. **编译并运行小程序**
4. **首页可查看、筛选、点击活动卡片查看详情**
5. **右下角"+"可创建新活动，详情页右上角可编辑活动**
6. **所有活动数据均保存在本地，重启小程序不会丢失**

## 注意事项
- 每个页面目录下需有 .js、.json、.wxml、.wxss 四个文件
- tabBar 页面跳转请用 wx.switchTab，非 tabBar 页面用 wx.navigateTo
- 如需扩展功能，可在 utils/ 添加工具函数

## 贡献与反馈
如有建议或 bug，欢迎 issue 或 PR！ 