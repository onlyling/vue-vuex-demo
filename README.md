# rouadmin

> 学习使用 vue vuex vue-resource 做一个单页应用
> 
> 使用vue-cli构建

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

2016-07-10
> 更新了验证用户是否登录、vuex中用户信息的初始化方式

用户信息在登录的时候缓存到浏览器中的`localStorage`里面，并且把缓存一个更新时间搓，根据更新时间戳是否超过缓存时间决定是否使用当前缓存的用户信息。
在根组件中，每5分钟更新一次用户信息，以保证用户信息不会超时，避免刷新页面后登陆状态丢失。
