/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-11 09:12:57
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-21 13:30:38
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/alarmLog/index.tsx
 * @Description: 报警日志页面
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */

import { ScrollPage } from "@/components/ScrollPage";

import { LogCard } from "./LogCard";
import { useInfiniteQuery } from "@/hooks/useInfiniteQuery";

import { type ReactNode } from "react";

export function AlarmLog({ picker, pickerValue }: { picker: ReactNode; pickerValue: string }) {
    // 日志
    const { data: logs, next } = useInfiniteQuery("/api/hardwareLog/queryAlarmLog", {
        [pickerValue ? "createdAt" : ""]: pickerValue,
    });

    return (
        <ScrollPage
            className=" flex-grow gap-3 flex flex-col"
            onScrollToLower={() =>  next()}
            lowerThreshold={200}
        >
            {picker}
            {logs?.map((page) =>
                page.content.map((log) => {
                    return (
                        <LogCard
                            key={log.toString()}
                            title={log.name}
                            description={log.content}
                            time={log.createdAt}
                            rank={Number(log.level ?? 3)}
                            position={log.warehouseName + log.areaName}
                        ></LogCard>
                    );
                })
            )}
           
        </ScrollPage>
    );
}
