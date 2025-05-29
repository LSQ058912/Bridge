/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-07 16:43:26
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:31:12
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/remoteControl/index.tsx
 * @Description: 远程控制页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { View } from "@tarojs/components";

import { type ReactNode } from "react";
import { ScrollPage } from "@/components/ScrollPage";
import { HarfSCreenCard } from "./HarfScreenCard";
import { FullSCreenCard } from "./FullScreenCard";
import { IconSwitch } from "@/components/IconSwitch";
import { NumberInput } from "@/components/NumberInput";
import { Slider } from "@/components/Slider";
import { cn } from "@/lib/utils";
import { useImmutableQuery } from "@/hooks/useQuery";
import { HARDWARE_TYPE } from "@/common/contains";
import { useMutate } from "@/hooks/useMutate";
import { showInfoToast } from "@/lib/tip";

export function RemoteControl({
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
    const { data: hardware, mutate } = useImmutableQuery<Record<HARDWARE_TYPE, any>>(
        warehouse && area ? "/api/hardware" : null,
        {
            warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
            areaId: area?.content[pickerValue[1]]?.id ?? 0,
        },
        { processType: "HARDWRAE_PROCESS" }
    );

    // 开关控制
    const { trigger: switchContro } = useMutate("/api/hardware/control");

    // 空调控制
    const { trigger: airControl } = useMutate("/api/hardware/controlAir");

    /**
     * @description: 渲染卡片
     * @param {Record<SENSOR_TYPE | HARDWARE_TYPE, any>} map
     * @param {SENSOR_TYPE | HARDWARE_TYPE} type
     * @param {(data: any) => ReactNode} card
     * @return {*}
     */
    const renderCard = (
        map: Record<HARDWARE_TYPE, any> | undefined,
        type: HARDWARE_TYPE,
        card: (data: any) => ReactNode
    ) => {
        if (map && map[type]) {
            return card(map[type]);
        }
        return null;
    };

    // 开关控制
    const switchHander = ({ ip, isOpen, type }: { ip: string; isOpen: number; type: number }) => {
        const oldData = hardware;
        const newData = { ...hardware, [type]: { ...hardware![type], isOpen } } as any;
        mutate(newData, false);
        switchContro({ ip, isOpen } as any, {
            onError: () => {
                mutate(oldData, false);
                showInfoToast("操作失败");
            },
        });
    };

    // 空调控制
    const airHandler = ({ ip, data, mode }: { ip: string;  data: number, mode: number }) => {
        const oldData = hardware;
        const newData = { ...hardware, [HARDWARE_TYPE.AIR_CONDITIONER]: { ...hardware![HARDWARE_TYPE.AIR_CONDITIONER], mode, data } } as any;
        mutate(newData, false);
        switchContro({ ip, mode, data } as any, {
            onError: () => {
                mutate(oldData, false);
                showInfoToast("操作失败");
            },
        });
    };



    return (
        <ScrollPage className=" flex-grow gap-3 flex flex-col">
            {picker}
            {(hardware?.[HARDWARE_TYPE.ENTRANCE_GUARD] ||
                hardware?.[HARDWARE_TYPE.ACOUSTO_OPTIC_ALARM]) && (
                <View
                    className={cn(
                        " grid  gap-3",
                        hardware?.[HARDWARE_TYPE.ENTRANCE_GUARD] &&
                            hardware?.[HARDWARE_TYPE.ACOUSTO_OPTIC_ALARM]
                            ? " grid-cols-2"
                            : "grid-cols-1"
                    )}
                >
                    {
                        /* 门禁设备 */
                        renderCard(hardware, HARDWARE_TYPE.ENTRANCE_GUARD, (data) => (
                            <HarfSCreenCard
                                icon={require("../../../assets/svg/door.svg")}
                                title="门禁设备"
                                name="6号门禁"
                                switchIcon={require("../../../assets/svg/open-door.svg")}
                                activeSwitchIcon={require("../../../assets/svg/open-door_white.svg")}
                                open={data.isOpen}
                                onChange={(flag) =>
                                    switchHander({ ip: data.ip, isOpen: +flag, type: data.type })
                                }
                            ></HarfSCreenCard>
                        ))
                    }
                    {
                        /* 声光报警器 */
                        renderCard(hardware, HARDWARE_TYPE.ACOUSTO_OPTIC_ALARM, (data) => (
                            <HarfSCreenCard
                                title="声光报警器"
                                name="7-3号报警器"
                                open={data.isOpen}
                                icon={require("@/assets/svg/alarm.svg")}
                                switchIcon={require("../../../assets/svg/power.svg")}
                                activeSwitchIcon={require("../../../assets/svg/power_white.svg")}
                                onChange={(flag) =>
                                    switchHander({ ip: data.ip, isOpen: +flag, type: data.type })
                                }
                            ></HarfSCreenCard>
                        ))
                    }
                </View>
            )}
            {
                /* 空调设备 */
                renderCard(hardware, HARDWARE_TYPE.AIR_CONDITIONER, (data) => (
                    <FullSCreenCard
                        title="空调设备"
                        name="空调"
                        open={data.isOpen}
                        icon={require("@/assets/svg/air-conditioning.svg")}
                        switchIcon={require("../../../assets/svg/power.svg")}
                        activeSwitchIcon={require("../../../assets/svg/power_white.svg")}
                        onChange={(flag) =>
                            switchHander({ ip: data.ip, isOpen: +flag, type: data.type })
                        }
                    >
                        <View className=" mt-4">
                            <View className=" h-[2rpx] bg-neutral-10"></View>
                            <View className=" flex justify-between pt-4 gap-6">
                                <IconSwitch
                                    leftIcon={require("@/assets/svg/snowflake.svg")}
                                    rightIcon={require("@/assets/svg/sun-one.svg")}
                                    activeLeftIcon={require("@/assets/svg/snowflake_active.svg")}
                                    activeRightIcon={require("@/assets/svg/sun-one_active.svg")}
                                    open={data.mode === 1}
                                    onChange={(value) => data.isOpen && airHandler({ip: data.ip, data: data.data, mode: +value, })}
                                ></IconSwitch>
                                <NumberInput
                                    className=" flex-grow"
                                    uni="℃"
                                    value={data.data}
                                    onChange={(value) => data.isOpen && airHandler({ip: data.ip, data: value, mode: data.mode, })}
                                ></NumberInput>
                            </View>
                        </View>
                    </FullSCreenCard>
                ))
            }

            {
                /* 风机 */
                renderCard(hardware, HARDWARE_TYPE.AIR_BLOWER, (data) => (
                    <FullSCreenCard
                        title="风机"
                        name="风机5(RPM)"
                        open={data.isOpen}
                        icon={require("@/assets/svg/whirlwind.svg")}
                        switchIcon={require("../../../assets/svg/power.svg")}
                        activeSwitchIcon={require("../../../assets/svg/power_white.svg")}
                        onChange={(flag) =>
                            switchHander({ ip: data.ip, isOpen: +flag, type: data.type })
                        }
                    >
                        <View className=" mt-4">
                            <Slider
                                stepList={[0, 500, 1000, 1500, 2000, 2500, 3000]}
                                step={500}
                                value={data.isOpen ? 1450 : 0}
                                max={3000}
                                min={0}
                            ></Slider>
                        </View>
                    </FullSCreenCard>
                ))
            }
        </ScrollPage>
    );
}
