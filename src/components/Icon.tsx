/*
 *           佛曰:
 *                   写字楼里写字间，写字间里程序员；
 *                   程序人员写程序，又拿程序换酒钱。
 *                   酒醒只在网上坐，酒醉还来网下眠；
 *                   酒醉酒醒日复日，网上网下年复年。
 *                   但愿老死电脑间，不愿鞠躬老板前；
 *                   奔驰宝马贵者趣，公交自行程序员。
 *                   别人笑我忒疯癫，我笑自己命太贱；
 *                   不见满街漂亮妹，哪个归得程序员？
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 10:06:45
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-17 10:20:17
 * @FilePath: /Labwant/src/components/Icon.tsx
 * @Description: Icon组件
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn, rpxToPx } from "@/lib/utils";
import { type ViewProps } from "@tarojs/components";
import { AtIcon } from "taro-ui";

export function Icon({
    value,
    size = 24,
    className,
    ...props
}: {
    className?: string;
    value: string;
    size?: number;
} & Omit<ViewProps, "style">) {
    return (
        <AtIcon
            className={cn("iconfont", className)}
            prefixClass="icon"
            value={value}
            size={rpxToPx(size * 2)}
            {...props}
        ></AtIcon>
    );
}
