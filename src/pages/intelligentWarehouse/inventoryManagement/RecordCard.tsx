/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-11 10:25:54
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 13:44:48
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/inventoryManagement/RecordCard.tsx
 * @Description: 库存管理-记录卡片
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */

import { View, Text, Image } from "@tarojs/components";

export function RecordCard({
    id,
    time,
    type,
    name,
    weight,
    warehouse,
    area,
    lab,
    user,
}: {
    id: number;
    name: string;
    type: string;
    weight: number;
    warehouse: string;
    area: string;
    user: string;
    lab: string;
    time: string;
}) {
    return (
        <View className=" p-4 text-text-regular bg-white  rounded-lg">
            <View className=" text-text-primary flex items-center">
                <View className=" text-lg flex items-center gap-2 font-semibold">
                    {id}.<Text>{name}</Text>
                    <View className=" px-2 py-1 rounded-full bg-brand-500 text-xs text-white">
                        {type}
                    </View>
                </View>
            </View>
            <View className=" pt-3 grid gap-2">
                <View className=" flex ">
                    <Text className=" w-16">仓库:</Text>
                    <Text>{warehouse}</Text>
                </View>
                <View className=" flex">
                    <Text className=" w-16">库区:</Text>
                    <Text>{area}</Text>
                </View>
                <View className=" flex">
                    <Text className=" w-16">重量:</Text>
                    <Text>{weight}g</Text>
                </View>
                <View className=" flex">
                    <Text className=" w-16">实验室:</Text>
                    <Text>{lab}</Text>
                </View>
            </View>
            <View className=" h-[2rpx] bg-neutral-10 mt-2 mb-2"></View>
            <View className=" flex items-center text-text-secondary text-sm gap-1 -mb-2 justify-between">
                <View className="flex items-center gap-1">
                    <Image
                        className=" w-4 h-4 rounded-full "
                        src={require("@/assets/svg/user.svg")}
                    ></Image>
                    {user}
                </View>
                {time}
            </View>
        </View>
    );
}
