/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-11 10:21:57
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 11:30:06
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/inventoryManagement/index.tsx
 * @Description: 库存管理页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { ScrollPage } from "@/components/ScrollPage";
import { View } from "@tarojs/components";
import { useState, type ReactNode } from "react";
import { RecordCard } from "./RecordCard";
import { useImmutableQuery } from "@/hooks/useQuery";
import { useInfiniteQuery } from "@/hooks/useInfiniteQuery";

export function InventoryManagement({
    picker,
    pickerValue,
}: {
    picker: ReactNode;
    pickerValue: number[];
}) {
    // 0: 入库
    // 1: 出库
    const [recordType, setRecordType] = useState(0);

    // 仓库
    const { data: warehouse } = useImmutableQuery("/api/warehouse");
    // 库区
    const { data: area } = useImmutableQuery(warehouse ? "/api/area" : null, {
        warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
    });

    const { data: recordList, next } = useInfiniteQuery(
        warehouse && area ? "/api/wasteLiquid" : null,
        {
            operateId: recordType,
            warehouseId: warehouse?.content[pickerValue[0]]?.id ?? 0,
            areaId: area?.content[pickerValue[1]]?.id ?? 0,
        }
    );

    return (
        <ScrollPage
            className=" flex-grow gap-3 flex flex-col "
            lowerThreshold={200}
            onScrollToLower={() => next()}
        >
            <View className=" flex justify-between">
                {picker}
                <View
                    className=" text-gray-600 mt-2 flex justify-center items-center text-sm px-3 h-7 bg-brand-600 text-fill-blank rounded-full"
                    onClick={() => setRecordType((recordType) => (recordType + 1) % 2)}
                >
                    {recordType === 0 ? "入库" : "出库"}
                </View>
            </View>

            {recordList?.map((page) =>
                page.content?.map((record) => (
                    <RecordCard
                        key={record.id}
                        id={record.id}
                        type={record.typeName}
                        time={record.createdAt}
                        area={record.areaName}
                        weight={record.weight}
                        lab={record.labName}
                        warehouse={record.warehouseName}
                        user={record.userName}
                        name={record.name}
                    ></RecordCard>
                ))
            )}
        </ScrollPage>
    );
}
