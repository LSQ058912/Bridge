/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 10:04:42
 * @LastEditors: Yanko 904852749@qq.com
 * @LastEditTime: 2024-06-11 16:49:24
 * @FilePath: /Labwant/src/app.config.ts
 * @Description: 应用配置页
 * 
 * Copyright (c) 2024 by Yanko, All Rights Reserved. 
 */
export default defineAppConfig({
  pages: [
    // "pages/index/index",
    "pages/menu/index",
    "pages/login/index",
    "pages/intelligentWarehouse/index",
    "pages/video/index",
    "pages/pageHaijun/index",
    "pages/record/index",
    "pages/order/index",
    "pages/orderSuccess/index",
    "pages/diandan/index"
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  plugins: {
    ezplayer: {
      version: "1.0.13",
      provider: "wxf2b3a0262975d8c2",
    },
  },
});
