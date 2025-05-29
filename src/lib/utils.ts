/*
 * @Author: Yanko 904852749@qq.com
 * @Date: 2024-06-06 13:54:15
 * @LastEditors: Yanko 904852749@qq.com
 * @LastEditTime: 2024-06-09 20:48:16
 * @FilePath: /Labwant/src/lib/utils.ts
 * @Description: lib
 * 
 * Copyright (c) 2024 by Yanko, All Rights Reserved. 
 */
import Taro from "@tarojs/taro";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge";


const deviceWidth = Taro.getSystemInfoSync().windowWidth;


/**
 * @description: css类合并函数
 * @param {array} inputs
 * @return {*}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @description: 单位转换 rpx -> px
 * @param {*} rpx
 * @return {*} px
 */
export const rpxToPx = (rpx) => {
  const px = (deviceWidth / 750) * Number(rpx)
  return Math.floor(px)
}

/**
 * @description: 单位转换 px -> rpx
 * @param {*} px
 * @return {*} rpx
 */
export const pxToRpx = (px) => {
  const rpx = (750 / deviceWidth) * Number(px)
  return Math.floor(rpx);
}