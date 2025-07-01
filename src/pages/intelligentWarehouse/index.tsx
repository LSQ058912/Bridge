/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 18:16:19
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2025-07-01 16:00:42
 * @FilePath: /Labwant3/src/pages/intelligentWarehouse/index.tsx
 * @Description: 智慧仓库页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */

import { Tabbar } from "./Tabbar";
import { useCallback, useEffect, useMemo, useState } from "react";
import Taro from "@tarojs/taro";
import { WarehouseEnvironment } from "./warehouseEnvironment";
import { Picker, View } from "@tarojs/components";
import { Page } from "@/components/Page";
import { RemoteControl } from "./remoteControl";
import { AlarmLog } from "./alarmLog";
import { InventoryManagement } from "./inventoryManagement";
import { useImmutableQuery } from "@/hooks/useQuery";
import * as _ from "lodash-es";
import { Icon } from "@/components/Icon";
import moment from "moment";

export default function IntelligentWarehouse() {
    const [tabbar] = useState([
        {
            title: "仓库环境",
            icon: require("@/assets/png/sleaves.png"),
            activeIcon: require("@/assets/png/sleaves_active.png"),
        },
        // {
        //     title: "远程控制",
        //     icon: require("@/assets/png/control.png"),
        //     activeIcon: require("@/assets/png/control_active.png"),
        // },
        // {
        //     title: "报警日志",
        //     icon: require("@/assets/png/alarm.png"),
        //     activeIcon: require("@/assets/png/alarm_active.png"),
        // },
        // {
        //     title: "库存管理",
        //     icon: require("@/assets/png/receive.png"),
        //     activeIcon: require("@/assets/png/receive_active.png"),
        // },
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    // picker选中信息
    const [pickerValue, setPickerValue] = useState([0, 0, 0]);
    // 仓库
    const { data: warehouse } = useImmutableQuery("/api/warehouse");
    // 库区
    const { data: area } = useImmutableQuery(warehouse ? "/api/area" : null, {
        warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
    });

    // 仓库picker数据
    const warehousePickerList = useMemo(() => {
        if (warehouse) {
            return warehouse.content.map((s) => s.name);
        }
        return [];
    }, [warehouse]);

    // 库区picker数据
    const areaPickerList = useMemo(() => {
        if (area) {
            return area.content.map((s) => s.name);
        }
        return [];
    }, [area]);

    // 报警级别
    const logPickerList = useMemo(() => {
        return ["高", "中", "低"];
    }, []);

    // tabbar切换
    useEffect(() => {
        Taro.setNavigationBarTitle({ title: tabbar[currentIndex].title });
    }, [currentIndex]);

    // picker
    const picker = useMemo(() => {
        return (
            <View className=" flex gap-2">
                <Picker
                    className=" pt-2 inline-flex"
                    mode="selector"
                    range={warehousePickerList}
                    onChange={(e) => setPickerValue([Number(e.detail.value), 0, 0])}
                    value={pickerValue[0]}
                >
                    <View className=" flex justify-center items-center text-sm pl-3 pr-1 h-7 bg-brand-600 rounded-full text-fill-blank">
                        {warehousePickerList.length ? warehousePickerList[pickerValue[0]] : "..."}
                        <Icon className=" ml-[4rpx]" size={16} value="sanjiaojiantou"></Icon>
                    </View>
                </Picker>
                <Picker
                    className=" pt-2 inline-flex"
                    mode="selector"
                    range={areaPickerList}
                    onChange={(e) =>
                        setPickerValue((value) => {
                            value[1] = Number(e.detail.value);
                            value[2] = 0;
                            return [...value];
                        })
                    }
                    value={pickerValue[1]}
                >
                    <View className=" flex justify-center items-center text-sm pl-3 pr-1 h-7 bg-brand-600 rounded-full text-fill-blank">
                        {areaPickerList.length ? areaPickerList[pickerValue[1]] : "..."}
                        <Icon className=" ml-[4rpx]" size={16} value="sanjiaojiantou"></Icon>
                    </View>
                </Picker>
                {currentIndex === 2 && (
                    <Picker
                        className=" pt-2 inline-flex"
                        mode="selector"
                        range={logPickerList}
                        onChange={(e) =>
                            setPickerValue((value) => {
                                value[2] = Number(e.detail.value);
                                return [...value];
                            })
                        }
                        value={pickerValue[2]}
                    >
                        <View className=" flex justify-center items-center text-sm pl-3 pr-1 h-7 bg-brand-600 rounded-full text-fill-blank">
                            {logPickerList[pickerValue[2]]}
                            <Icon className=" ml-[4rpx]" size={16} value="sanjiaojiantou"></Icon>
                        </View>
                    </Picker>
                )}
            </View>
        );
    }, [warehousePickerList, areaPickerList, pickerValue, currentIndex]);

    // 起始时间
    const [startTime, setStartTime] = useState("");
    // 截止时间
    const [endTime, setEndTime] = useState("");

    // 重置时间
    const resetTime = () => {
        setStartTime("");
        setEndTime("");
    };

    const timePicker = (
        <View className="  flex gap-2">
            <Picker
                className=" pt-2 inline-flex"
                mode="date"
                onChange={(e) => {
                    setStartTime(e.detail.value);
                }}
                value=""
            >
                <View className=" flex justify-center items-center text-sm pl-3 pr-1 h-7 bg-brand-600 rounded-full text-fill-blank">
                    {startTime || "起始时间"}
                    <Icon className=" ml-[4rpx]" size={16} value="sanjiaojiantou"></Icon>
                </View>
            </Picker>
            <Picker
                className=" pt-2 inline-flex"
                mode="date"
                onChange={(e) => {
                    setEndTime(e.detail.value);
                }}
                value=""
            >
                <View className=" flex justify-center items-center text-sm pl-3 pr-1 h-7 bg-brand-600 rounded-full text-fill-blank">
                    {endTime || "截止时间"}
                    <Icon className=" ml-[4rpx]" size={16} value="sanjiaojiantou"></Icon>
                </View>
            </Picker>
            <View
                className="px-3 h-7 flex justify-center mt-2 items-center text-sm rounded-full bg-brand-600 text-fill-blank"
                onClick={resetTime}
            >
                重置
            </View>
        </View>
    );

    const tabbarChangeHandler = useCallback((index) => {
        setCurrentIndex(index);
    }, []);

    return (
        <Page className=" p-0 flex flex-col">
            {currentIndex === 0 && (
                <WarehouseEnvironment
                    picker={picker}
                    pickerValue={pickerValue}
                ></WarehouseEnvironment>
            )}
            {currentIndex === 1 && (
                <RemoteControl picker={picker} pickerValue={pickerValue}></RemoteControl>
            )}
            {currentIndex === 2 && (
                <AlarmLog
                    picker={timePicker}
                    pickerValue={`${startTime || "1970-01-01"},${
                        endTime || moment(Date.now()).format("YYYY-MM-DD")
                    }`}
                ></AlarmLog>
            )}
            {currentIndex === 3 && (
                <InventoryManagement
                    picker={picker}
                    pickerValue={pickerValue}
                ></InventoryManagement>
            )}
            <Tabbar value={tabbar} current={currentIndex} onChange={tabbarChangeHandler}></Tabbar>
        </Page>
    );
}
