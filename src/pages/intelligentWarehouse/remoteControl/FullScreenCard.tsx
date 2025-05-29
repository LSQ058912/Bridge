/*
 *
 *    ┏┓　　　┏┓
 *  ┏┛┻━━━┛┻┓
 *  ┃　　　　　　　┃
 *  ┃　　　━　　　┃
 *  ┃　＞　　　＜　┃
 *  ┃　　　　　　　┃
 *  ┃...　⌒　...　┃
 *  ┃　　　　　　　┃
 *  ┗━┓　　　┏━┛
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃
 *      ┃　　　┃  神兽保佑
 *      ┃　　　┃  代码无bug
 *      ┃　　　┃
 *      ┃　　　┗━━━┓
 *      ┃　　　　　　　┣┓
 *      ┃　　　　　　　┏┛
 *      ┗┓┓┏━┳┓┏┛
 *        ┃┫┫　┃┫┫
 *        ┗┻┛　┗┻┛
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 08:53:05
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:16:13
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/remoteControl/FullScreenCard.tsx
 * @Description: 远程控制-全屏卡片
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { Text, View, Image } from "@tarojs/components";
import { useEffect, useState, type ReactNode } from "react";

export function FullSCreenCard({
    icon,
    switchIcon,
    title,
    name,
    children,
    activeSwitchIcon,
    open: popen,
    defaultOpen,
    onChange,
}: {
    icon?: string;
    switchIcon?: string;
    activeSwitchIcon?: string;
    title: string;
    name: string;
    children?: ReactNode;
    open?: boolean;
    defaultOpen?: boolean;
    onChange?: (flag: boolean) => void;
}) {
    const [open, setOpen] = useState(defaultOpen || popen || false);

    useEffect(() => {
        if (popen !== undefined) {
            setOpen(popen);
        }
    }, [popen]);

    const clickHandle = () => {
        if (popen === undefined) {
            setOpen(!open);
        }
        onChange?.(!open);
    };
    return (
        <View>
            <Text className=" text-text-placeholder text-sm ml-1">{title}</Text>
            <View className=" p-4 bg-white mt-1 rounded-lg ">
                <View className="flex justify-between items-center ">
                    <View className=" flex gap-2 items-center">
                        <Image
                            className=" bg-info-300 w-6 h-6 p-1 box-border rounded-full"
                            src={icon ?? ""}
                        ></Image>
                        <Text className=" text-text-primary text-sm">{name}</Text>
                    </View>
                    <View className=" bg-info-300 w-7 h-7 rounded-full" onClick={clickHandle}>
                        <Image
                            className={cn(
                                "w-7 h-7 p-1 box-border rounded-full",
                                open ? " bg-brand-600" : "bg-info-300"
                            )}
                            src={(open ? activeSwitchIcon : switchIcon) ?? ""}
                        ></Image>
                    </View>
                </View>
                {children}
            </View>
        </View>
    );
}
