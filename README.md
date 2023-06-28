# 问卷管理系统前端

项目的live demo在 https://mysurvey.wwwyxxx.uk


本仓库为问卷管理系统b端的前端代码的仓库。
包括: 用户注册，用户登录，问卷列表，星标列表，回收站，问卷编辑，问卷发布，答卷统计，答卷数据可视化。

#

  

剩下的两个仓库在

1）Survey-Backend: https://github.com/WangyingxuHalo/Survey-Backend

2）Survey-Client: https://github.com/WangyingxuHalo/Survey-Client

  # 技术栈

使用React.js, TypeScript, Antd来实现所有的页面。
使用Redux管理数据。
使用部分ahooks定义好的hooks比如useRequest, useDebounce等。
使用Recharts来可视化答卷数据。
使用dnd kit实现问卷列表的拖拽排序。
自定义封装多个组件比如问卷里的输入框，标题，段落组件及其属性组件，避免代码的重复性
自定义定义hooks，比如useLoadUserInfo, useLoadPageInfo, useGetUserInfo等