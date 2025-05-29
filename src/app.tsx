/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 10:04:42
 * @LastEditors: Yanko 904852749@qq.com
 * @LastEditTime: 2024-06-11 14:49:52
 * @FilePath: /Labwant/src/app.tsx
 * @Description: 
 * 
 * Copyright (c) 2024 by Yanko, All Rights Reserved. 
 */
import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { SWRConfig } from "swr";
import { quertFetcher } from "./api";
import "./app.css";
import "./styles/iconfont.css";


function App({ children }: PropsWithChildren<any>) {
    useLaunch(() => {
        console.log("App launched.");
    });

    // children 是将要会渲染的页面
    return (
        <SWRConfig
            value={{
                fetcher: quertFetcher,
            }}
        >
            {children}
        </SWRConfig>
    );
}

export default App;
