/*
 *                                |~~~~~~~|
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *                                |       |
 *     |~.\\\_\~~~~~~~~~~~~~~xx~~~         ~~~~~~~~~~~~~~~~~~~~~/_//;~|
 *     |  \  o \_         ,XXXXX),                         _..-~ o /  |
 *     |    ~~\  ~-.     XXXXX`)))),                 _.--~~   .-~~~   |
 *      ~~~~~~~`\   ~\~~~XXX' _/ ';))     |~~~~~~..-~     _.-~ ~~~~~~~
 *               `\   ~~--`_\~\, ;;;\)__.---.~~~      _.-~
 *                 ~-.       `:;;/;; \          _..-~~
 *                    ~-._      `''        /-~-~
 *                        `\              /  /
 *                          |         ,   | |
 *                           |  '        /  |
 *                            \/;          |
 *                             ;;          |
 *                             `;   .       |
 *                             |~~~-----.....|
 *                            | \             \
 *                           | /\~~--...__    |
 *                           (|  `\       __-\|
 *                           ||    \_   /~    |
 *                           |)     \~-'      |
 *                            |      | \      '
 *                            |      |  \    :
 *                             \     |  |    |
 *                              |    )  (    )
 *                               \  /;  /\  |
 *                               |    |/   |
 *                               |    |   |
 *                                \  .'  ||
 *                                |  |  | |
 *                                (  | |  |
 *                                |   \ \ |
 *                                || o `.)|
 *                                |`\\) |
 *                                |       |
 *                                |       |
 *
 * @Author: 赵晨炀 904852749@qq.com
 * @Date: 2024-06-17 10:27:36
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:17:49
 * @FilePath: /Labwant/src/components/Slider.tsx
 * @Description: Slider组件
 *
 * Copyright (c) 2024 by 赵晨炀, All Rights Reserved.
 */

import { cn } from "@/lib/utils";
import { View, Slider as TSlider, Text } from "@tarojs/components";
import { useEffect, useRef, useState } from "react";

export function Slider({
    value: pvalue,
    className,
    step = 20,
    stepList,
    onChange,
    max = 100,
    min = 0,
}: {
    value?: number;
    className?: string;
    step?: number;
    stepList?: number[];
    onChange?: (value: number) => void;
    max?: number;
    min?: number;
}) {
    const [value, setValue] = useState(pvalue || 0);
    const prevValue = useRef(0);


    useEffect(() => {
        if(pvalue !== undefined) {
            setValue(pvalue);
        }
    }, [pvalue])

    const sliderChangingHandle = (e) => {
        if (e.detail.value === prevValue.current) return;
        prevValue.current = e.detail.value;
        if(pvalue === undefined) {
            setValue(e.detail.value);
        }
    };


    const sliderChangeHandle = (e) => {
        prevValue.current = e.detail.value;
        if(pvalue === undefined) {
            setValue(e.detail.value);
        }
        onChange?.(e.detail.value);
    };

    return (
            <View className={cn(" relative h-7 flex justify-center items-center mb-4", className)}>
                <View className=" h-2 bg-info-400 w-full rounded-full"></View>
                <View className=" absolute  h-2 bg-brand-600 rounded-full left-0" style={{
                    width: `calc(${value / max * 100}%)`
                }}></View>
                <View className=" absolute flex justify-between w-full">
                    {stepList?.map((item) => (
                        <View
                            className="h-3 w-3 rounded-full bg-info-400 flex justify-center"
                            key={item}
                        >
                            <Text className=" absolute mt-6 text-text-secondary text-xs">{item}</Text>
                        </View>
                    ))}
                </View>
                <View className=" absolute w-[calc(100%-24rpx)] h-4">
                    <View
                        style={{
                            left: `calc(${value / max * 100}% - 16rpx)`,
                        }}
                        className=" absolute h-4 w-4 rounded-full bg-white border-2 border-solid border-border-base"
                    ></View>
                </View>
                <TSlider
                    max={max}
                    min={min}
                    step={step}
                    className=" absolute w-[calc(100%-24rpx)] opacity-0"
                    onChange={sliderChangeHandle}
                    onChanging={sliderChangingHandle}
                ></TSlider>
            </View>
    );
}
