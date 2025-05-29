/*
 *                                                     __----~~~~~~~~~~~------___
 *                                    .  .   ~~//====......          __--~ ~~
 *                    -.            \_|//     |||\\  ~~~~~~::::... /~
 *                 ___-==_       _-~o~  \/    |||  \\            _/~~-
 *         __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *     _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *   .~       .~       |   \\ -_    /  /-   /   ||      \   /
 *  /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 *  |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *           '         ~-|      /|    |-~\~~       __--~~
 *                       |-~~-_/ |    |   ~\_   _-~            /\
 *                            /  \     \__   \/~                \__
 *                        _--~ _/ | .-~~____--~-/                  ~~==.
 *                       ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                  -_     ~\      ~~---l__i__i__i--~~_/
 *                                  _-~-__   ~)  \--______________--~~
 *                                //.-~~~-~_--~- |-------~~~~~~~~
 *                                       //.-~~~--\
 *                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *                               神兽保佑            永无BUG
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 09:52:37
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:30:17
 * @FilePath: /Labwant/src/components/NumberInput.tsx
 * @Description: 数字Input组件
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { View, Text, Image } from "@tarojs/components";
import { useEffect, useState } from "react";


export function NumberInput({
    value: pvalue,
    onChange,
    className,
    uni,
    step = 0.5,
    disabled = false
}: {
    className?: string;
    value?: number;
    onChange?: (value: number) => void;
    uni?: string;
    step?: number;
    disabled?: boolean;
}) {
    const [value, setValue] = useState(pvalue || 0);

    useEffect(() => {
        if (pvalue !== undefined) {
            setValue(pvalue);
        }
    }, [pvalue]);

    const addHandle = () => {
        if(disabled) return 
        if (pvalue === undefined) {
            setValue((value) => value + step);
        }
        onChange?.(value + step);
    };

    const subtractHandle = () => {
        if (pvalue === undefined) {
            setValue((value) => value - step);
        }
        onChange?.(value - step);
    };

    return (
        <View
            className={cn(
                " h-7 bg-border-base rounded-full flex items-center justify-between",
                className
            )}
        >
            <Image
                className=" h-6 w-6 ml-1"
                src={require("@/assets/svg/minus.svg")}
                onClick={subtractHandle}
            ></Image>
            <Text className=" text-text-regular">{value + (uni ?? "")}</Text>
            <Image
                className=" h-6 w-6 mr-1"
                src={require("@/assets/svg/plus.svg")}
                onClick={addHandle}
            ></Image>
        </View>
    );
}
