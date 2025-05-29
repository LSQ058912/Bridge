/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-07 13:28:31
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 11:18:57
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/warehouseEnvironment/Card.tsx
 * @Description: 仓库环境-卡片容器
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { View, Text, Image } from "@tarojs/components";
import { type ReactNode } from "react";

export function Card({
    title,
    icon,
    children,
}: {
    title: string;
    icon?: string;
    children?: ReactNode;
}) {
    return (
        <View className=" bg-white rounded-lg p-3 flex flex-col ">
            <View className="flex text-text-primary text-sm gap-2 items-center pb-3">
                <Image
                    className=" bg-info-300 w-6 h-6 p-1 box-border rounded-full"
                    src={icon ?? ""}
                ></Image>
                <Text>{title}</Text>
            </View>
            {children}
        </View>
    );
}
