/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 18:23:33
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-18 10:57:15
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/Tabbar.tsx
 * @Description:
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { cn } from "@/lib/utils";
import { CoverView, CoverImage } from "@tarojs/components";

export function Tabbar({
    value: tabbar,
    current,
    onChange,
}: {
    value: Record<string, any>[];
    current: number;
    onChange?: (index: number) => void;
}) {
    const clickHandle = (index) => {
        onChange?.(index);
    };

    return (
        <CoverView
            className="w-full h-20 px-2 bg-background-base border-0  border-border-base border-t  border-solid fixed bottom-0 left-0 flex justify-around box-border pt-2"
            onTouchMove={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            {tabbar.map((item, index) => (
                <CoverView
                    className={cn("flex flex-col items-center")}
                    key={index}
                    onClick={() => clickHandle(index)}
                >
                    <CoverImage
                        className=" w-6 h-6 bg-gray-300"
                        src={current === index ? item.activeIcon : item.icon}
                    ></CoverImage>
                    <CoverView
                        className={cn(
                            "flex flex-col items-center text-xs text-text-secondary mt-1",
                            current === index && " text-brand-600"
                        )}
                    >
                        {item.title}
                    </CoverView>
                </CoverView>
            ))}
        </CoverView>
    );
}
