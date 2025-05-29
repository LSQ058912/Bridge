/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-07 15:26:34
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-18 10:34:00
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/warehouseEnvironment/Progress.tsx
 * @Description: 仓库环境-进度条
 * 
 * Copyright (c) 2024 by Yanko, All Rights Reserved. 
 */
import { cn } from "@/lib/utils";
import { View } from "@tarojs/components";
import { memo } from "react";

export const Progress = memo(function ({
    className,
    total,
    current,
    colorCls = "bg-yellow-400",
}: {
    className?: string;
    total: number;
    current: number;
    colorCls?: string;
}) {
    const step = total / 40;
    const progress = Math.round(current / step);
    

    return (
        <View className={cn(" relative h-5 bg-info-400", className)}>
            <View
                style={{ width: `calc(100%/40*${progress})`}}
                className={cn(" h-full", colorCls)}
            ></View>
            <View className=" translate-x-[1px] top-0 absolute w-full h-full bg-gradient-to-r from-transparent from-70% to-fill-base to-30% bg-[length:calc(100%/40)_100%]"></View>
        </View>
    );
});
