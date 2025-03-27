# 康复智联后端

## 安装pnpm(如果没有的话)
```sh
npm i -g pnpm
```

## 安装依赖
```sh
pnpm i
```

## 开发环境
```sh
pnpm dev
```

## 生产环境
```sh
pnpm start
```

## 文件夹
- ### routes
路由层，按路由分权限

    - user 无需鉴权
    - public 无需实名 level 0
    - patient 病人或以上 level 1
    - doctor 医生或以上 level 2
    - admin 管理员 level 3

- ### controller
控制器，解析数据和简单检验数据，将数据传入service中。

- ### service
服务层，进行业务逻辑处理，可以调用repository进行数据库操作

- ### repository
数据库层

- ### dto
统一返回的格式

- ### database
数据库实例化/初始化函数

- ### middlewares
中间层

    - auth 鉴权
    - cors 跨域
    - errorHandler 错误处理

- ### model
数据库模型

- utils

    - encryption 加密/解密函数
    - eventBus 事件总线，导出单例。

    > on 监听某个事件

    > off 取消监听某个事件
    
    > emit 发布某个事件

    - jwt
    - vCode 随机码生成函数
    - withTransaction 数据库事务处理