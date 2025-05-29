/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-07 16:28:00
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 12:58:36
 * @FilePath: /Labwant/src/components/ScrollPage.tsx
 * @Description: 滚动页面容器
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { cn } from "@/lib/utils";
import { ScrollView, View, type ScrollViewProps } from "@tarojs/components";

export function ScrollPage({
    className,
    children,
    showScrollbar = true,
    ...props
}: {
    className?: string;
    children: React.ReactNode;
    showScrollbar?: boolean;
} & ScrollViewProps) {
    return (
            <ScrollView
                className={cn("h-[calc(100vh-160rpx)] overflow-hidden relative")}
                enableFlex={true}
                enhanced={true}
                showScrollbar={showScrollbar}
                scrollY
                // enablePassive
                {...props}
            >
                <View className={cn("box-border px-4 pb-4 bg-neutral-4 relative min-h-full", className)}>
                    {children}
                </View>
            </ScrollView>
           

    );
}
