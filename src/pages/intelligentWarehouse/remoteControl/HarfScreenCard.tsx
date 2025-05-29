/*
 * _______________#########_______________________
 * ______________############_____________________
 * ______________#############____________________
 * _____________##__###########___________________
 * ____________###__######_#####__________________
 * ____________###_#######___####_________________
 * ___________###__##########_####________________
 * __________####__###########_####_______________
 * ________#####___###########__#####_____________
 * _______######___###_########___#####___________
 * _______#####___###___########___######_________
 * ______######___###__###########___######_______
 * _____######___####_##############__######______
 * ____#######__#####################_#######_____
 * ____#######__##############################____
 * ___#######__######_#################_#######___
 * ___#######__######_######_#########___######___
 * ___#######____##__######___######_____######___
 * ___#######________######____#####_____#####____
 * ____######________#####_____#####_____####_____
 * _____#####________####______#####_____###______
 * ______#####______;###________###______#________
 * ________##_______####________####______________
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 08:52:57
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 13:56:22
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/remoteControl/HarfScreenCard.tsx
 * @Description: 远程控制-半屏卡片
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { Text, View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";

export function HarfSCreenCard({
    icon,
    title,
    name,
    open: popen,
    defaultOpen,
    switchIcon,
    activeSwitchIcon,
    onChange,
}: {
    icon?: string;
    switchIcon?: string;
    activeSwitchIcon?: string;
    title: string;
    name: string;
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
            <View className=" p-4  bg-white mt-1 rounded-lg flex justify-between items-cente">
                <View className=" flex flex-col justify-center gap-3">
                    <Image
                        className={cn(" bg-info-300 w-6 h-6 p-1 box-border rounded-full")}
                        src={icon ?? ""}
                    ></Image>
                    <Text className=" text-text-primary text-sm">{name}</Text>
                </View>
                <View onClick={clickHandle}>
                    <Image
                        className={cn(
                            "w-7 h-7 p-1 box-border rounded-full",
                            open ? " bg-brand-600" : "bg-info-300"
                        )}
                        src={(open ? activeSwitchIcon : switchIcon) ?? ""}
                    ></Image>
                </View>
            </View>
        </View>
    );
}
