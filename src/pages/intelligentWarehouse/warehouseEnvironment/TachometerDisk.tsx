/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-07 17:24:49
 * @LastEditors: 赵晨炀 904852749@qq.com
 * @LastEditTime: 2024-06-26 14:39:43
 * @FilePath: /Labwant/src/pages/intelligentWarehouse/warehouseEnvironment/TachometerDisk.tsx
 * @Description: 仓库环境-圆形仪表盘
 *
 * Copyright (c) 2024 by Yanko, All Rights Reserved.
 */
import { Canvas, Text, View } from "@tarojs/components";
import Taro, { type CanvasContext } from "@tarojs/taro";
import { memo, useMemo } from "react";

export const TachometerDisk = memo(function ({
    color = "#409EFF",
    backgroundColor = "#dedfe0",
    duration = 1000,
    radius = 50,
    lineWidth = 14,
    title,
    total,
    current,
}: {
    color?: string;
    backgroundColor?: string;
    title: string;
    duration?: number;
    total: number;
    current: number;
    radius?: number;
    lineWidth?: number;
}) {
    // 圆弧信息
    const arcInfo = useMemo(() => {
        const padding = 2;
        return {
            x: radius + lineWidth / 2 + padding,
            y: radius + lineWidth / 2 + padding,
            lineWidth: lineWidth,
            with: 2 * radius + lineWidth + padding * 2,
            height: (1 + 1 / Math.sqrt(2)) * radius + lineWidth + padding * 2,
        };
    }, [radius, lineWidth]);

    /**
     * @description: 初始化canvas
     * @return {*}
     */
    const initCanvas = () => {
        Taro.createSelectorQuery()
            .select("#canvas")
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node;

                const renderWidth = res[0].width;
                const renderHeight = res[0].height;
                const ctx: Taro.CanvasContext = canvas.getContext("2d");

                const dpr = Taro.getWindowInfo().pixelRatio;
                canvas.width = renderWidth * dpr;
                canvas.height = renderHeight * dpr;

                ctx.scale(dpr, dpr);

                startAnimation(ctx);
            });
    };

    /**
     * @description: 绘制外层圆弧
     * @param {CanvasContext} ctx
     * @return {*}
     */
    const drawOuterArc = (ctx: CanvasContext) => {
        ctx.beginPath();
        ctx.lineWidth = arcInfo.lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = backgroundColor;
        ctx.arc(arcInfo.x, arcInfo.y, radius, Math.PI * 0.75, Math.PI * 0.25);
        ctx.stroke();
        ctx.closePath();
    };

    /**
     * @description: 绘制内层圆弧
     * @param {CanvasContext} ctx
     * @param {number} schedule 进度
     * @return {*}
     */
    const drawInnerArc = (ctx: CanvasContext, schedule: number) => {
        ctx.beginPath();
        ctx.lineWidth = arcInfo.lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;
        ctx.arc(arcInfo.x, arcInfo.y, radius, Math.PI * 0.75, Math.PI * 0.75 + schedule);
        ctx.stroke();
        ctx.closePath();
    };

    /**
     * @description: 开始动画
     * @param {CanvasContext} ctx
     * @return {*}
     */
    const startAnimation = (ctx: CanvasContext) => {
        let previousTimeStamp: number;
        let time = 0;
        const arc = Math.PI * 1.5 * (current / total);
        const animation = (timestamp) => {
            if (previousTimeStamp === undefined) {
                previousTimeStamp = timestamp;
            }

            const elapsed = timestamp - previousTimeStamp;
            time += elapsed;
            const schedule = easeInOutCubic(time / duration) * arc;

            drawOuterArc(ctx);
            drawInnerArc(ctx, schedule);

            previousTimeStamp = timestamp;
            // 请求下一帧
            if (schedule < arc) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    /**
     * @description: easeInOutCubic曲线
     * @param {number} percent
     * @return {*}
     */
    const easeInOutCubic = (percent: number) => {
        const t = percent;
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    return (
        <View
            className=" relative"
            style={{ width: `${arcInfo.with}px`, height: `${arcInfo.height}px` }}
        >
            <Canvas
                ref={() => initCanvas()}
                style={{ width: `${arcInfo.with}px`, height: `${arcInfo.height}px` }}
                id="canvas"
                type="2d"
            />
            <View className=" absolute w-full h-full top-0 left-0 flex justify-center items-center flex-col">
                <Text className=" mt-6 text-sm text-gray-400 ">{title}</Text>
                <Text style={{ color: color }} className=" text-2xl font-bold">
                    {current}
                </Text>
            </View>
        </View>
    );
});
