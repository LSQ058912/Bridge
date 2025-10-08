/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 17:29:25
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 13:05:16
 * @FilePath: /Labwant/src/components/Page.tsx
 * @Description: 页面容器
 * 
 * Copyright (c) 2024 by Yanko, All Rights Reserved. 
 */


import { cn } from "@/lib/utils";
import { View } from "@tarojs/components";

export function Page({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <View
      className={cn(" min-h-[100vh] h-full box-border px-0 bg-neutral-4 relative", className)}
    >
      {children}
    </View>
  );
}
