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
 * @Date: 2024-06-19 11:20:35
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-19 13:16:21
 * @FilePath: /Labwant/src/components/ValidateInput.tsx
 * @Description: ValidateInput组件
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { onValidateField } from "@/lib/validate";
import { Input, Text, View, type InputProps } from "@tarojs/components";
import { type Rule } from "async-validator";
import { useState } from "react";

export function ValidateInput({
    rules,
    name,
    className,
    onBlur,
    ...props
}: InputProps & { rules?: Rule }) {
    const [errorMsg, setErrorMsg] = useState("");

    /**
     * @description: 校验表单
     * @param {*} value
     * @return {*}
     */
    const validateHandle = async (value) => {
        if (!rules) return;

        const error = await onValidateField(
            { [name ?? "no name"]: value },
            { [name ?? "no name"]: rules }
        );
        if (error) {
            setErrorMsg(error.map((e) => e.message).join(","));
        } else {
            setErrorMsg("");
        }
    };

    return (
        <View className={cn(" flex flex-col", className)}>
            <Input
                name={name}
                onBlur={(e) => {
                    validateHandle(e.detail.value);
                    onBlur?.(e);
                }}
                {...props}
            />
            {errorMsg && (
                <Text className=" absolute  text-xs text-danger-600 -bottom-[30rpx]">
                    {errorMsg}
                </Text>
            )}
        </View>
    );
}
