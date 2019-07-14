# Garbage-Admin
> 此管理系统采用vue-element-admin 模板。主要功能是管理小程序云开发环境的数据。前一段时间开发了一个垃圾分类的小程序采用了云开发环境。有用户提交数据，管理起来相当麻烦。工作中用的都是电脑，手机屏幕太小管理起来不方便，于是开发此系统。方便把自己的小程序数据整理，丰富垃圾库。
 
 ### vue-element-admin 模板
  [vue-admin-template](https://github.com/PanJiaChen/vue-admin-template.git)
  包括此项目的运行方式。
  实在不会玩的请先去学习[vue-element-admin的使用](https://panjiachen.gitee.io/vue-element-admin-site/zh/guide/#%E5%AE%89%E8%A3%85)
### 要求
 此项目要会小程序云开发
 [小程序云开发](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)
 [外部调用云函数和云数据库](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/reference-http-api/) 
### 配置
1. 需要和[Garbage](https://github.com/qi19901212/Garbage)配合使用
2. 配置小程序appid和secret 位置：src/api/user.js->getAccessToken中appid和secret 的换成你自己的。以及里面的云环境env 改掉
3. 自己的小程序云环境要首先搭建好，要不然云函数是调用不起来的。

### 注意
此项目不能部署，直接在本地运行。部署可能会有代理问题。

### 小程序讨论群

[群](https://developers.weixin.qq.com/community/develop/doc/000cc6600f0610559fc857f6c5600c)

### 打赏
有钱的捧个钱场没钱的捧个人场。辛辛苦苦赚钱的请绕道，不忍心。觉得我实在太辛苦而且正好有小金库的，来来来看下面。
![哈哈](https://github.com/qi19901212/GarbageAdmin/blob/master/qqqqqq.jpeg)




