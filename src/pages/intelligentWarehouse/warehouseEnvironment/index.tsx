/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 19:18:01
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:36:20
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/warehouseEnvironment/index.tsx
 * @Description: 仓库环境页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */

import { View } from "@tarojs/components";

import { Card } from "./Card";
import { Progress } from "./Progress";
import { memo, type ReactNode } from "react";
import { ScrollPage } from "@/components/ScrollPage";
import { TachometerDisk } from "./TachometerDisk";
import { cn, rpxToPx } from "@/lib/utils";
import { useImmutableQuery } from "@/hooks/useQuery";
import { HARDWARE_TYPE, SENSOR_TYPE } from "@/common/contains";

export const WarehouseEnvironment = memo(function WarehouseEnvironment({
    picker,
    pickerValue,
}: {
    picker: ReactNode;
    pickerValue: number[];
}) {
    // 仓库
    const { data: warehouse } = useImmutableQuery("/api/warehouse");
    // 库区
    const { data: area } = useImmutableQuery(warehouse ? "/api/area" : null, {
        warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
    });
    // 硬件
    const { data: hardware } = useImmutableQuery(
        warehouse && area ? "/api/hardware" : null,
        {
            warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
            areaId: area?.content[pickerValue[1]]?.id ?? 0,
        },
        { processType: "HARDWRAE_PROCESS" }
    );

    // 传感器
    const { data: sensor } = useImmutableQuery(
        warehouse && area ? "/api/sensor" : null,
        {
            warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
            areaId: area?.content[pickerValue[1]]?.id ?? 0,
        },
        { processType: "SENSOR_PROCESS" }
    );

    // 监控
    const { data: vidicon } = useImmutableQuery(warehouse && area ? "/api/vidicon" : null, {
        warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
        areaId: area?.content[pickerValue[1]]?.id ?? 0,
    });

    /**
     * @description: 渲染卡片
     * @param {Record<SENSOR_TYPE | HARDWARE_TYPE, any>} map
     * @param {SENSOR_TYPE | HARDWARE_TYPE} type
     * @param {(data: any) => ReactNode} card
     * @return {*}
     */
    const renderCard = (
        map: Record<SENSOR_TYPE | HARDWARE_TYPE, any>,
        type: SENSOR_TYPE | HARDWARE_TYPE,
        card: (data: any) => ReactNode
    ) => {
        if (map && map[type]) {
            return card(map[type]);
        }
        return null;
    };

    return (
        <ScrollPage className=" flex gap-3 flex-col">
            {picker}
            {(sensor?.[SENSOR_TYPE.TEMPERATURE_SENSOR] ||
                sensor?.[SENSOR_TYPE.HUMIDITY_SENSOR]) && (
                <View
                    className={cn(
                        " grid gap-3",
                        sensor?.[SENSOR_TYPE.TEMPERATURE_SENSOR] &&
                            sensor?.[SENSOR_TYPE.HUMIDITY_SENSOR]
                            ? " grid-cols-2"
                            : "grid-cols-1"
                    )}
                >
                    {
                        /* 环境温度 */
                        renderCard(sensor, SENSOR_TYPE.TEMPERATURE_SENSOR, (data) => (
                            <Card
                                title="环境温度(℃)"
                                icon={require("../../../assets/svg/thermometer.svg")}
                            >
                                <View className=" h-16 text-6xl text-success-600 flex-grow flex items-center justify-center">
                                    {Math.round(data.data)}
                                </View>
                            </Card>
                        ))
                    }
                    {
                        /* 环境湿度 */
                        renderCard(sensor, SENSOR_TYPE.HUMIDITY_SENSOR, (data) => (
                            <Card
                                title="环境湿度(%RH))"
                                icon={require("../../../assets/svg/water.svg")}
                            >
                                <View className=" h-16 text-6xl text-brand-600 flex-grow flex items-center justify-center">
                                    {Math.round(data.data)}
                                </View>
                            </Card>
                        ))
                    }
                </View>
            )}
            {
                /* VOC浓度 */
                renderCard(sensor, SENSOR_TYPE.VOC_SENSOR, (data) => (
                    <Card title="VOC浓度(%LEL)" icon={require("../../../assets/svg/fire.svg")}>
                        <View className=" w-full h-14 text-xl text-success-600 flex-grow flex items-center justify-between">
                            <Progress
                                className=" w-[560px]"
                                colorCls=" bg-success-600"
                                total={5}
                                current={data.data}
                            ></Progress>
                            {data.data.toFixed(1)}
                        </View>
                    </Card>
                ))
            }
            {
                /* 可燃气体浓度 */
                renderCard(sensor, SENSOR_TYPE.VOC_SENSOR, (data) => (
                    <Card title="可燃气体浓度(%LEL)" icon={require("../../../assets/svg/wind.svg")}>
                        <View className=" w-full h-14 text-xl text-brand-600 flex-grow flex items-center justify-between">
                            <Progress
                                className=" w-[560px]"
                                colorCls=" bg-brand-600"
                                total={5}
                                current={data.data}
                            ></Progress>
                            {data.data.toFixed(1)}
                        </View>
                    </Card>
                ))
            }

            {
                /* 风机转速 */
                renderCard(hardware, HARDWARE_TYPE.AIR_BLOWER, (data) => (
                    <Card title="风机转速(RPM)" icon={require("../../../assets/svg/whirlwind.svg")}>
                        <View className=" flex justify-center items-center pt-2 pb-6">
                            <TachometerDisk
                                title={data.name}
                                total={3000}
                                current={data.data}
                                radius={rpxToPx(110)}
                            ></TachometerDisk>
                        </View>
                    </Card>
                ))
            }
            <View className=" grid grid-cols-2 gap-3">
                {
                    /* 排风机 */
                    renderCard(hardware, HARDWARE_TYPE.AIR_BLOWER, (data) => (
                        <Card title="排风机" icon={require("../../../assets/svg/whirlwind.svg")}>
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {data.isError ? "异常" : "正常"}
                                <View className=" flex gap-2">
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? " bg-info-600" : "  bg-success-600"
                                        )}
                                    ></View>
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? "bg-danger-600" : "bg-info-600"
                                        )}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
                {
                    /* 门禁设备 */
                    renderCard(hardware, HARDWARE_TYPE.ENTRANCE_GUARD, (data) => (
                        <Card title="门禁设备" icon={require("../../../assets/svg/door.svg")}>
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {data.isError ? "异常" : "正常"}
                                <View className=" flex gap-2">
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? " bg-info-600" : "  bg-success-600"
                                        )}
                                    ></View>
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? "bg-danger-600" : "bg-info-600"
                                        )}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
                {
                    /* 空调 */
                    renderCard(hardware, HARDWARE_TYPE.AIR_CONDITIONER, (data) => (
                        <Card
                            title="空调"
                            icon={require("../../../assets/svg/air-conditioning.svg")}
                        >
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {data.isError ? "异常" : "正常"}
                                <View className=" flex gap-2">
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? " bg-info-600" : "  bg-success-600"
                                        )}
                                    ></View>
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? "bg-danger-600" : "bg-info-600"
                                        )}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
                {
                    /* 紫外灯 */
                    renderCard(hardware, HARDWARE_TYPE.ULTRAVIOLET_LAMP, (data) => (
                        <Card title="紫外灯" icon={require("../../../assets/svg/light.svg")}>
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {"ㅤ"}
                                <View className=" flex gap-2">
                                    <View
                                        className={cn("w-7 h-3 rounded-md", " bg-info-600")}
                                    ></View>
                                    <View
                                        className={cn("w-7 h-3 rounded-md", "bg-info-600")}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
                {
                    /* 照明灯 */
                    <Card title="照明灯" icon={require("../../../assets/svg/floodlight.svg")}>
                        <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                            {"正常"}
                            <View className=" flex gap-2">
                                <View className={cn("w-7 h-3 rounded-md", "bg-success-600")}></View>
                                <View className={cn("w-7 h-3 rounded-md", "bg-info-600")}></View>
                            </View>
                        </View>
                    </Card>
                }
                {
                    /* 废弃处置机 */
                    renderCard(hardware, HARDWARE_TYPE.DISCARD_HANDLER, (data) => (
                        <Card title="废弃处置机" icon={require("../../../assets/svg/discord.svg")}>
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {data.isError ? "异常" : "正常"}
                                <View className=" flex gap-2">
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? " bg-info-600" : "  bg-success-600"
                                        )}
                                    ></View>
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            data.isError ? "bg-danger-600" : "bg-info-600"
                                        )}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
                {
                    /* 监控 */
                    vidicon?.content?.map((item) => (
                        <Card title="监控" icon={require("../../../assets/svg/monitor-camera.svg")}>
                            <View className=" h-14 text-sm text-text-primary flex flex-col justify-center gap-1">
                                {item.is_open ? "开启 " : "关闭"}

                                <View className=" flex gap-2">
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            !item.is_open ? " bg-info-600" : "  bg-success-600"
                                        )}
                                    ></View>
                                    <View
                                        className={cn(
                                            "w-7 h-3 rounded-md",
                                            !item.is_open ? "bg-danger-600" : "bg-info-600"
                                        )}
                                    ></View>
                                </View>
                            </View>
                        </Card>
                    ))
                }
            </View>
        </ScrollPage>
    );
});
