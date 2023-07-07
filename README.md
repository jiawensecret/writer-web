# README

### 基本架构

1. dashboard 主后台 go+umijs 后台（不带登录）
2. login 后台 公用登录主体 跳转回原网页并将 token 送过去 go+umijs。
3. login 进入后通过权限判断 dashboard 里配置的 product，点击跳转到对应的 product。
4. product 区分 category 有比较重的整个后台 也有轻量的工具 比如 chatgpt 的封装
