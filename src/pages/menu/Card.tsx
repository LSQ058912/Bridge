/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 17:36:23
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 15:05:59
 * @FilePath: /Labwant/src/pages/menu/Card.tsx
 * @Description: 菜单页-卡片
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/utils";
import { Image, View, type StandardProps, type ITouchEvent } from "@tarojs/components";

export function Card({
    title,
    icon,
    className,
    showGo = true,
    subTitle,
    ...props
}: { title: string; icon: string, showGo?: boolean, subTitle?: string; } & StandardProps<any, ITouchEvent>) {
    return (
        <View
            {...props}
            className={cn(
                " relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-400  rounded-lg h-48 flex-col",
                className
            )}
        >
            <View className="mt-5 ml-5 text-xl text-white font-bold">{title}</View>
            <View className="mt-1 ml-5 text-xs text-white font-normal">{subTitle}</View>
            {showGo && <View className="ml-5 mt-1 text-[20rpx] flex justify-center items-center text-white w-9 h-5 rounded-full bg-brand-600">
                GO<Icon value="youjiantou1" size={10}></Icon>
            </View>}
            <Image
                className=" absolute w-[268rpx] h-[268rpx] -right-[50rpx] -bottom-[58rpx]"
                src={icon}
            ></Image>
        </View>
    );
}
