##  Athird plugin for html-webpack-plugin 
## 【 html-webpack-plugin的第三方插件】
### 用于多页面时公用资源处理（css、js）
### 用法
- var HtmlWebpackPlugin = require('html-webpack-plugin');
- var HtmlWebpackReprocessSourcePlugin = require('html-webpack-reprocess-source-plugin');
+ webpack.config.js中配置
- 1.启用插件：new HtmlWebpackReprocessSourcePlugin({ enable: true }) //enable: true 启用插件
- 2.启用插件：new HtmlWebpackPlugin({
- reprocessSource = true; // 启用插件钩子 
- onlyAssets = true;   //将当前html文件替换为只有静态资源链接（可用于插入公用js、css引用）
- injectType = 'js';  // 判定注入的文件类型 ，默认为css、js都注入
- chunks = ["vendors"]; 
- inject = 'body';      //不为false时插件生效
- })
