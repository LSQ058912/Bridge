/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 09:19:35
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:32:28
 * @FilePath: /Labwant/src/components/IconSwitch.tsx
 * @Description: 带有Icon的Switch
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { Image, View } from "@tarojs/components";
import { useEffect, useState } from "react";

export function IconSwitch({
    leftIcon,
    rightIcon,
    activeLeftIcon,
    activeRightIcon,
    open: popen,
    onChange,
    className,
    disabled = false
}: {
    leftIcon?: string;
    rightIcon?: string;
    activeLeftIcon?: string;
    activeRightIcon?: string;
    open?: boolean;
    className?: string;
    disabled?: boolean;
    onChange?: (open: boolean) => void;
}) {
    const [open, setOpen] = useState(popen || false);

    useEffect(() => {
        if (popen !== undefined) {
            setOpen(popen);
        }
    }, [popen]);

    const clickHandle = () => {
        if(disabled) return
        if (popen === undefined) {
            setOpen((open) => !open);
        }
        onChange?.(!open);
    };

    return (
        <View
            className={cn(" h-7 w-24 bg-border-base rounded-full relative p-[2rpx]", className)}
            onClick={clickHandle}
        >
            <Image
                className=" absolute h-full w-[100rpx] p-[10rpx] box-border rounded-full flex justify-center items-center left-0"
                src={leftIcon ?? ""}
            ></Image>
            <Image
                className=" absolute h-full w-[100rpx] p-[10rpx] box-border rounded-full flex justify-center items-center right-0"
                src={rightIcon ?? ""}
            ></Image>
            <Image
                className={cn(
                    " absolute h-[calc(100%-4rpx)] w-[100rpx] p-1 box-border bg-fill-light rounded-full flex justify-center items-center",
                    open ? "right-[2rpx]" : "left-[2rpx]"
                )}
                src={(open ? activeRightIcon : activeLeftIcon) ?? ""}
            ></Image>
        </View>
    );
}
