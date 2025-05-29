/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-11 09:16:50
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 13:45:38
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/alarmLog/LogCard.tsx
 * @Description: 报警日志-日志卡片
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { View, Text, Image } from "@tarojs/components";

export function LogCard({
    tags,
    time,
    title,
    rank,
    description,
    position,
}: {
    title: string;
    description: string;
    time: string;
    rank?: number;
    tags?: Array<string>;
    users?: Array<string>;
    position?: string;
}) {
    const rankNameList = ["高", "中", "低"];
    const rankName = rank ? rankNameList[rank - 1] : null;
    

    return (
        <View className=" p-4  text-text-regular rounded-lg bg-white">
            <View className=" flex items-center gap-4 ">
                <View className=" flex-1 text-base flex items-center gap-2 text-text-primary font-semibold">
                    {title}

                    {rankName && (
                        <View
                            className={cn(" px-2 py-1 rounded-full text-white bg-red-500 text-xs", {
                                " bg-danger-500": rank == 1,
                                " bg-warning-500": rank == 2,
                                " bg-success-500": rank == 3,
                            })}
                        >
                            {rankName}
                        </View>
                    )}
                </View>
            </View>
            <View className=" pt-3">
                <Text className="  text-base">{description}</Text>
            </View>
            <View className=" flex gap-2 text-brand-500">
                {tags?.map((item) => (
                    <View key={item} className=" px-2  border-2 rounded-full text-sm">
                        {item}
                    </View>
                ))}
            </View>
            <View className=" h-[2rpx] bg-neutral-10 mt-2 mb-2"></View>
            <View className=" flex items-center justify-between text-text-secondary text-sm gap-1 -mb-2">
                <Text>{position}</Text>

                <Text>{time}</Text>
            </View>
        </View>
    );
}
